import React from 'react'

const ResetConfirmation = ({ setShowResetModal, resetDatabase }) => {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl p-6 w-[420px] shadow-xl">

                <h2 className="text-xl font-bold text-red-600 mb-3">
                    ⚠ Reset Database
                </h2>

                <p className="text-gray-600 mb-6">
                    This action is <span className="font-semibold text-red-500">irreversible</span>.
                    All contacts updates will be reset and cannot be recovered.
                    Only recommended if you want to start fresh.
                </p>

                <div className="flex justify-end gap-3">

                    <button
                        onClick={() => setShowResetModal(false)}
                        className="px-4 hover:cursor-pointer text-gray-700 py-2 rounded-lg bg-white hover:bg-gray-200"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={async () => {
                            await resetDatabase();
                            setShowResetModal(false);
                        }}
                        className="px-4 hover:cursor-pointer py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                    >
                        Confirm Reset
                    </button>

                </div>

            </div>

        </div>
    )
}

export default ResetConfirmation
