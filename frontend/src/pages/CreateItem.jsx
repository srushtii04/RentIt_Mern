import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {createItem} from "../services/itemService";
import { generateDescription } from "../services/aiService";

function CreateItem() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      pricePerDay: "",
      category: "Electronics",
      location: "",
      contactNumber: "",
      image: null,
    });
  
  const [loadingAI, setLoadingAI] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleImage = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleGenerateDescription = async () => {
    if(!formData.title.trim()) {
      alert("Please enter item title first.");
      return;
    }

    try {
      setLoadingAI(true);
      const data = await generateDescription({
        title: formData.title,
        description: formData.description,
        category: formData.category
      });

      setFormData({
        ...formData,
        description: data.description
      });
    }

    catch (err) {
      console.log(err);
      alert("Failed to generate description.");
    }

    finally {
      setLoadingAI(false);
    }
  };

  const handleSubmit =
async (e) => {

 e.preventDefault();

 try {

   const cloudData =
   new FormData();

   cloudData.append(
    "file",
    formData.image
   );

   cloudData.append(
    "upload_preset",
    "renthub"
   );

   const cloudRes =
   await fetch(
    `https://api.cloudinary.com/v1_1/dotwdj0gj/image/upload`,
    {
      method:"POST",
      body:cloudData
    }
   );

   const cloudinaryData =
   await cloudRes.json();

   const user =
   JSON.parse(
     localStorage.getItem(
       "user"
     )
   );

   await createItem({

     title:
      formData.title,

     description:
      formData.description,

     pricePerDay:
      formData.pricePerDay,

     category:
      formData.category,

     location:
      formData.location,

     contactNumber:
      formData.contactNumber,

     image:
      cloudinaryData.secure_url,

     owner:
      user._id

   });

   navigate("/");

 } catch(error){

   console.log(error);

 }

};

  return (
    <div className="min-h-screen bg-[#f7f5fb]">

      <div className="bg-white shadow-sm">

        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">

          <button
            onClick={() => navigate("/")}
          >
            <FiArrowLeft
              size={22}
              className="text-purple-600"
            />
          </button>

          <h1
            className="
            text-xl
            font-semibold
            text-purple-600
          "
          >
            Post an Item
          </h1>

        </div>

      </div>

      <div
        className="
        max-w-4xl
        mx-auto
        bg-white
        rounded-3xl
        shadow-md
        mt-8
        p-6
      "
      >

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label>
              Item Title *
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="
              w-full
              border
              rounded-xl
              p-3
              mt-2
              "
            />
          </div>

          <div>
            <label>
              Description *
            </label>

            <textarea
              rows="5"
              name="description"
              value={
                formData.description
              }
              onChange={handleChange}
              className="
              w-full
              border
              rounded-xl
              p-3
              mt-2
              "
            />

            <div className="flex justify-end mt-3">

              <button
              type="button"
              onClick={handleGenerateDescription}
              disabled={loadingAI}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2 rounded-xl hover:opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >

              {loadingAI ? "Generating..." : "✨ Generate Description"}

              </button>

            </div>
          </div>

          <div
            className="
            grid
            md:grid-cols-2
            gap-4
          "
          >

            <div>
              <label>
                Daily Rate *
              </label>

              <input
                type="number"
                name="pricePerDay"
                value={
                  formData.pricePerDay
                }
                onChange={
                  handleChange
                }
                className="
                w-full
                border
                rounded-xl
                p-3
                mt-2
                "
              />
            </div>

            <div>
              <label>
                Category *
              </label>

              <select
                name="category"
                value={
                  formData.category
                }
                onChange={
                  handleChange
                }
                className="
                w-full
                border
                rounded-xl
                p-3
                mt-2
                "
              >
                <option>
                  Electronics
                </option>

                <option>
                  Tools
                </option>

                <option>
                  Vehicles
                </option>

                <option>
                  Sports
                </option>

                <option>
                  Furniture
                </option>

                <option>
                  Other
                </option>

              </select>
            </div>

          </div>

          <div>
            <label>
              Location *
            </label>

            <input
              type="text"
              name="location"
              value={
                formData.location
              }
              onChange={
                handleChange
              }
              className="
              w-full
              border
              rounded-xl
              p-3
              mt-2
              "
            />
          </div>

          <div>
            <label>
              Contact Number *
            </label>

            <input
              type="text"
              name="contactNumber"
              value={
                formData.contactNumber
              }
              onChange={
                handleChange
              }
              className="
              w-full
              border
              rounded-xl
              p-3
              mt-2
              "
            />
          </div>

          <div>
            <label>
              Upload Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={
                handleImage
              }
              className="
              w-full
              border
              rounded-xl
              p-3
              mt-2
              "
            />
          </div>

          <div
            className="
            flex
            gap-4
            pt-4
          "
          >

            <button
              type="button"
              onClick={() =>
                navigate("/")
              }
              className="
              flex-1
              border
              rounded-xl
              py-3
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
              flex-1
              bg-purple-600
              text-white
              rounded-xl
              py-3
              "
            >
              Post Item
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateItem;