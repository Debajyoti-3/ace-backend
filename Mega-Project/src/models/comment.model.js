import mongoose from "mongoose";
// import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

import aggregatePaginate from "mongoose-aggregate-paginate-v2"; // use this , as aggregatePaginate is default supported name in this case. otherwise you have to explicitly create a function of that name(your choiced name)

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.plugin(aggregatePaginate); // this is for Pagination
export const Comment = mongoose.model("Comment", commentSchema);
