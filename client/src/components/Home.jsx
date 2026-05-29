import React, { useEffect, useState } from "react";
import { bookBaseUrl } from "../../axiosInstance";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";

const Home = () => {
  const [bookForm, setBookForm] = useState({
    BookName: "",
    BookTitle: "",
    Author: "",
    SellingPrice: "",
    PublishDate: "",
    Id: "",
  });
  const [bookList, setBookList] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const getAllbookList = async () => {
    try {
      const { data } = await bookBaseUrl.get("booklists");
      setBookList(data?.BookList);
      console.log("booklist", data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        await getAllbookList();
      } catch (error) {
        // no-op
        console.log(error);
      }
    };

    if (mounted) load();

    return () => {
      mounted = false;
    };
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBookForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handdleDelete = async (id) => {
    try {
      const { data } = await bookBaseUrl.post("deletebook", { Id: id });
      if (data?.Success) {
        alert(data.Message);
        getAllbookList();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (data) => {
    setBookForm({
      BookName: data?.BookName,
      BookTitle: data?.BookTitle,
      Author: data?.Author,
      SellingPrice: data?.SellingPrice,
      PublishDate: data?.PublishDate,
      Id: data?._id,
    });
    setIsUpdating(true);
  };

  const handleSubmit = async () => {
    try {
      if (
        !bookForm.BookName ||
        !bookForm.BookTitle ||
        !bookForm.Author ||
        !bookForm.SellingPrice
      ) {
        alert("All fields are required!");
        return;
      }

      if (isUpdating) {
        // UPDATE
        const { data } = await bookBaseUrl.put("/updatebook", bookForm);
        if (data?.Success) {
          alert(data?.Message);
          setIsUpdating(false);
        }
      } else {
        // ADD
        const { data } = await bookBaseUrl.post("/addbook", bookForm);
        if (data?.Success) {
          alert(data?.Message);
        }
      }

      setBookForm({
        BookName: "",
        BookTitle: "",
        Author: "",
        SellingPrice: "",
        PublishDate: "",
        Id: "",
      });

      getAllbookList();
    } catch (error) {
      console.log(error);
    }
  };

  console.log("bookForm", bookForm);
  return (
    <div className="w-full px-5 min-h-[calc(100vh-60px)]:">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 my-5">
        <div>
          <label htmlFor="">Book Name</label>
          <input
            type="text"
            placeholder="Book Name"
            className="w-full border-2 text-gray-800 border-gray-300 rounded-sm outline-1 h-9 px-2"
            name="BookName"
            value={bookForm.BookName}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="">Book Title</label>
          <input
            type="text"
            placeholder="Book Title"
            className="w-full border-2 text-gray-800 border-gray-300 rounded-sm outline-1 h-9 px-2"
            name="BookTitle"
            value={bookForm.BookTitle}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="">Author</label>
          <input
            type="text"
            placeholder="Author"
            className="w-full border-2 text-gray-800 border-gray-300 rounded-sm outline-1 h-9 px-2"
            name="Author"
            value={bookForm.Author}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="">Selling Price</label>
          <input
            type="text"
            placeholder="Selling Price"
            className="w-full border-2 text-gray-800 border-gray-300 rounded-sm outline-1 h-9 px-2"
            name="SellingPrice"
            value={bookForm.SellingPrice}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="">Publish Date</label>
          <input
            type="date"
            placeholder="Publish Date"
            className="w-full border-2 text-gray-800 border-gray-300 rounded-sm outline-1 h-9 px-2"
            name="PublishDate"
            value={bookForm.PublishDate}
            onChange={handleFormChange}
          />
        </div>
      </div>
      <div className="w-full flex justify-end">
        <button
          className="bg-gray-800 text-white rounded-md px-3 py-1 cursor-pointer"
          onClick={handleSubmit}
        >
          SUBMIT
        </button>
      </div>
      <div className="w-full mt-10">
        <div className="w-full overflow-x-auto">
          <table className="min-w-[900px] bg-white divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Book Name
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Book Title
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Author
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Selling Price
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Publish Date
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookList?.map((book, index) => {
                return (
                  <tr className="hover:bg-gray-200" key={index}>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {book.BookName}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {book.BookTitle}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {book.Author}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {book.SellingPrice}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {book.PublishDate}
                    </td>
                    <td className="px-6 py-3">
                      <div className="w-24 flex justify-center gap-4">
                        <div
                          className="h-8 w-8 flex justify-center items-center bg-red-100 text-red-600 rounded cursor-pointer"
                          onClick={() => handdleDelete(book._id)}
                          aria-label="Delete"
                        >
                          <MdDelete />
                        </div>
                        <div
                          className="h-8 w-8 flex justify-center items-center bg-green-100 text-green-600 rounded cursor-pointer"
                          onClick={() => handleUpdate(book)}
                          aria-label="Edit"
                        >
                          <FaPen />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
