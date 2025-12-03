import React, { useEffect, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import { CARD_BG } from "../../utils/data";
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import moment from "moment";
import Modal from '../../components/Modal';
import CreateSessionForm from './CreateSessionForm';
import DeleteAlertContent from '../../components/DeleteAlertContent';
import SummaryCard from '../../components/Cards/SummaryCard'; // Make sure this import exists

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  // Fetch all sessions for logged-in user
  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      console.log("API response:", response.data);

      // Safely set sessions array
      setSessions(response.data.sessions || []);
    } catch (error) {
      console.error("Error fetching session data: ", error);
      toast.error("Failed to fetch sessions. Please try again later.");
    }
  };

  // Delete a session
  const deleteSession = async (sessionData) => {
    if (!sessionData?._id) return;

    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData._id));
      toast.success("Session deleted successfully");
      setOpenDeleteAlert({ open: false, data: null });
      fetchAllSessions();
    } catch (error) {
      console.error("Error deleting session:", error);
      toast.error("Failed to delete session. Please try again.");
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto pt-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
          {sessions.length === 0 && (
            <p className="text-center col-span-full text-gray-500">
              No sessions found. Click "Add New" to create one.
            </p>
          )}

          {sessions?.map((data, index) => (
            <SummaryCard 
              key={data?._id}
              colors={CARD_BG[index % CARD_BG.length]}
              role={data?.role || ""}
              topicsToFocus={data?.topicsToFocus || ""}
              experience={data?.experience || "-"}
              questions={data?.questions?.length || 0}
              description={data?.description || ""}
              lastUpdated={
                data?.updatedAt ? moment(data.updatedAt).format("Do MMM YYYY") : ""
              }
              onSelect={() => navigate(`/interview-prep/${data?._id}`)}
              onDelete={() => setOpenDeleteAlert({ open: true, data })}
            />
          ))}
        </div>

        <button
          className="h-12 md:h-12 flex items-center justify-center gap-3 
             bg-gradient-to-r from-[#ff9324] to-[#e99a4b] 
             text-sm font-semibold text-white px-7 py-2.5 rounded-full 
             shadow-md cursor-pointer 
             fixed bottom-10 md:bottom-20 right-10 md:right-20 
             transition-colors hover:bg-black hover:text-white hover:shadow-2xl hover:shadow-orange-300"
          onClick={() => setOpenCreateModal(true)}
        >
          <LuPlus className="text-2xl text-white"/>
          Add New
        </button>
      </div>

      {/* Create Session Modal */}
      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
      >
        <CreateSessionForm onSuccess={fetchAllSessions} onClose={() => setOpenCreateModal(false)} />
      </Modal>

      {/* Delete Session Modal */}
      <Modal
        isOpen={openDeleteAlert.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        title="Delete Alert"
      >
        <div className="w-[30vw]">
          <DeleteAlertContent
            content="Are you sure you want to delete this session?"
            onDelete={() => deleteSession(openDeleteAlert.data)}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
