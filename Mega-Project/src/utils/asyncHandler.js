/* here asyncHandler is a high order function (its a function who can takes functions
as arguments and can return functions)
*/

// using promise (may seems complex)
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) =>
      next(error)
    );
  };
};

export { asyncHandler };


// const asyncHandler = ()=>{}
// const asyncHandler = ()=>{() => {}}
// const asyncHandler = ()=>{ async () => {}}

        // using try-catch (easy way)
// const asyncHandler = (fn)=> async (res,req,next)=>{
//     try {
//         await fn(res,req,next)
//     } catch (error) {
//         res.status( error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }
