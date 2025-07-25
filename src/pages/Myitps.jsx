import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";
import { Link } from "react-router";
import { MdDelete } from "react-icons/md";
import { FaEye, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

const Myitps = () => {
  const { user } = use(AuthContext);
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetch(`https://garden-server-beige.vercel.app/mytips/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setTips(data);
        setLoading(false);
      })
      .catch(() => {
        setTips([]);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  if (!tips.length) {
    return (
      <p className="min-h-screen text-2xl md:text-4xl flex items-center justify-center text-white font-bold text-center px-4">
        You have not posted any tips yet
      </p>
    );
  }

  const handleDelete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(`https://garden-server-beige.vercel.app/tips/${id}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.deletedCount) {
                swalWithBootstrapButtons.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
                const remainingTips = tips.filter((tip) => tip._id !== id);
                setTips(remainingTips);
              }
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  return (
    <div className="container mx-auto pt-10 px-2">
      <div className="text-green dark:bg-black dark:text-white dark:border-white w-full md:w-8/12 lg:w-5/12 mb-6 mx-auto text-center py-4 rounded-tl-full rounded-br-full border-4 border-green bg-white">
        <h2 className="text-xl font-bold md:text-3xl">
          You have not posted any tips yet.
        </h2>
      </div>
      <div className="bg-white dark:bg-black dark:text-white dark:border-white w-full lg:w-10/12 mx-auto text-green border-4 border-double border-green rounded-xl p-4">
        <div className="hidden md:grid grid-cols-4 dark:border-white gap-4 pb-2 border-b-2 border-green font-bold text-lg">
          <div>Image</div>
          <div>Title</div>
          <div>Category</div>
          <div className="text-center">CRUD</div>
        </div>
        {tips.map((item) => (
          <div
            key={item._id}
            className="grid dark:bg-black dark:text-white dark:border-white grid-cols-1 md:grid-cols-4 items-center gap-4 mt-4 border-2 p-4 rounded-xl border-green"
          >
            <div className="flex justify-center md:justify-start">
              <img
                className="w-16 h-16 md:w-24 md:h-24 rounded-full object-cover"
                src={item.imageUrl}
                alt={item.title}
              />
            </div>
            <div>
              <h3 className="font-semibold text-center md:text-left">
                {item.title}
              </h3>
            </div>
            <div>
              <h3 className="text-center md:text-left">{item.category}</h3>
            </div>
            <div className="flex justify-center gap-3">
              <Link to={`/tips-details/${item._id}`} className="dark:bg-black dark:text-white dark:border-white border bg-green text-white p-2 rounded-lg transition">
                <FaEye className="text-xl" />
              </Link>
              <button
                onClick={() => handleDelete(item._id)}
                className="dark:bg-black dark:text-white dark:border-white border bg-green cursor-pointer text-white p-2 rounded-lg transition"
              >
                <MdDelete className="text-xl" />
              </button>
              <Link
                to={`/tips-update/${item._id}`}
                className="dark:bg-black dark:text-white dark:border-white border bg-green text-white p-2 rounded-lg transition"
              >
                <FaEdit className="text-xl" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myitps;
