import React from "react";

const DeleteUserConfirmation = ({ setShowDeleteModal, deleteUser, user }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl p-6 w-[420px] shadow-xl">

        <h2 className="text-xl font-bold text-red-600 mb-3">
          ⚠ Delete User
        </h2>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete
          <span className="font-semibold text-red-500"> {user?.name}</span>?
          <br />
          This action is <span className="font-semibold text-red-500">irreversible</span>.
        </p>
        <p className="text-sm bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-3 mb-6">
          After deletion, all contacts assigned to this user will become 
          <span className="font-semibold"> unallocated</span>.  
          Please click the <span className="font-semibold">“Allot Contacts”</span> button to
          distribute these contacts equally among the remaining OCs.
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={async () => {
              await deleteUser(user.uid);
              setShowDeleteModal(false);
            }}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Delete User
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteUserConfirmation;