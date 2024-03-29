import Navbar from "../../components/Header/Desktop";
// import Data from "../../data/InfoData";
// import User from "../../assets/user.svg";
import FilterIcon from "../../assets/Live_Area.svg";
import SearchIcon from "../../assets/search.svg";
// import Payment from "../../data/StatusPembayaran";
import Tabel from "../../data/HeadManage";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCourse } from "../../redux/Actions/CourseActions";
import AddIcon from "../../assets/add.svg";
import AddCourse from "../../components/Modal/AddCourse";
import EditeCourse from "../../components/Modal/EditeCourse";
import NavDide from "../../components/Header/Side";

const ManageCourse = () => {
  const dispatch = useDispatch();
  const [pages, setPages] = useState(1);

  const [activeModal, setActiveModal] = useState(null);
  const [courseId, setCourseId] = useState("");

  const { courses } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getCourse(pages));
  }, [dispatch, pages]);

  const handleOpenModal = (modalType, courseId) => {
    setActiveModal(modalType);
    setCourseId(courseId);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setCourseId(null);
  };

  return (
    <div className="flex  ">
      <NavDide />
      <div className="w-[100%] lg:w-[85%] mb-14  ">
        <div className="w-full ">
          <Navbar />
        </div>
        <div className="flex flex-col justify-center items-center container mt-10 mx-auto">
          <div className="font-bold font-Montserrat text-xl w-full mb-2">
            Data Kelas
          </div>

          <div className="flex flex-row justify-between w-full mb-4 items-center">
            <div className="font-bold font-Montserrat text-base items-center  flex flex-row gap-4 text-DARKBLUE05">
              <p>Pages</p>
              <input
                type="number"
                className="border-2 w-14 border-black rounded-lg text-center text-base overflow-hidden"
                min="1"
                value={pages}
                onChange={(e) => setPages(e.target.value)}
              />
            </div>
            <div className="flex flex-row gap-3">
              <div>
                <button
                  onClick={() => handleOpenModal("addCourse")}
                  className="bg-DARKBLUE05 flex flex-row justify-center items-center p-[6px] rounded-2xl gap-1 text-white font-bold font-Montserrat"
                >
                  <img src={AddIcon} />
                  <p>Tambah</p>
                </button>
                <AddCourse
                  addCourse={activeModal === "addCourse"}
                  setAddCourse={handleCloseModal}
                />
              </div>

              <button className="flex flex-row p-[6px] border-[1px] border-DARKBLUE05 rounded-3xl justify-center items-center">
                <img src={FilterIcon} />
                <p className="text-base font-Montserrat text-DARKBLUE05 font-bold">
                  Filter
                </p>
              </button>
              <form className="relative">
                <div className="flex flex-row">
                  <input
                    type="search"
                    placeholder="Cari"
                    className="w-full outline-none  px-4 py-[6px] border-2 rounded-2xl border-[#6148FF]"
                    //   value={searchTerm}
                    //   onChange={handleInputChange}
                  />
                  <button
                    type="submit"
                    className="absolute bottom-1/2 right-2 translate-y-1/2 rounded-lg bg-[#6148FF] p-[2px]"
                  >
                    <img src={SearchIcon} />
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="table table-striped w-full text-left ">
              <thead className="font-Montserrat text-base text-left whitespace-nowrap">
                <tr>
                  {Tabel.map((data) => (
                    <th
                      key={data.id}
                      scope="col"
                      className="bg-LightBlue5 py-4 px-2 md:px-4"
                    >
                      {data.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-left  px-2 md:px-4 ">
                {courses.map((data) => (
                  <tr
                    key={data.id}
                    className="bg-white border-b font-Montserrat text-xs "
                  >
                    <td scope="row" className="pl-2 md:pl-4">
                      {data.code}
                    </td>
                    <td className=" py-4 whitespace-nowrap ">
                      {data.category ?? "-"}
                    </td>
                    <td className=" py-4 font-bold whitespace-nowrap">
                      {data.title ?? "-"}
                    </td>
                    <td
                      className={`py-4 ${
                        data.type === "Free"
                          ? "text-green-500 font-bold"
                          : "text-red-700 font-bold"
                      }`}
                    >
                      {data.type ?? "-"}
                    </td>
                    <td className=" py-4">{data.level ?? "-"}</td>
                    <td className=" py-4">{data.totalPrice ?? "-"}</td>
                    <td className="pr-4">
                      <div className="flex flex-row gap-2 font-bold text-white">
                        <Link
                          as={Link}
                          to={`/manage-modules/${data.id}`}
                          className="p-1 bg-DARKBLUE05 rounded-md "
                        >
                          Kelola
                        </Link>
                        <div>
                          <button
                            onClick={() =>
                              handleOpenModal("editeCourse", data.id)
                            }
                            className="p-1 bg-DARKBLUE05 rounded-md "
                          >
                            Ubah
                          </button>
                        </div>
                        <button className="p-1 bg-DARKBLUE05 rounded-md">
                          Detail
                        </button>
                        <button className="p-1 bg-red-600 rounded-md">
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <EditeCourse
              editeCourse={activeModal === "editeCourse"}
              setEditeCourse={handleCloseModal}
              id={courseId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCourse;
