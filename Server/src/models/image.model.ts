import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema(
  {
    image: {
      publicId: {
        type: String,
        required: true,
      },
      url: {
        type: String, //cloudinary url
        required: true,
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Image = mongoose.model("Image", imageSchema);
