import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Email must be valid."],
      required: [true, "Email is required."],
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters."],
      required: [true, "Password is required."],
    },
    cartProducts: [
      {
        quantity: {
          type: Number,
          default: 1,
          min: [1, "Quantity must be at least 1."],
          required: [true, "Quantity is required."],
        },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Product id is required."],
        },
      },
    ],
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
      required: [true, "Role is required."],
    },
  },
  {
    timestamps: true,
  }
);

// // pre-save hook to hash password before saving to database //
// userSchema.pre("save", async function (next) {
//   try {
//     if (!this.isModified("password")) return next();

//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);

//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // compare input password to hashed password in database //
// userSchema.methods.comparePasswords = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

export default mongoose.model("User", userSchema);
