import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../customHooks/configAxios";
import LoadingPage from "../../Loading";
function RiderAccounts() {
  const navigate = useNavigate();
  const [raidersInfo, setRaiderInfo] = useState(null);

  useEffect(() => {
    api
      .get("/admin/raider-infos")
      .then((res) => {
        console.log(res.data);
        setRaiderInfo(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const addRaider = () => {
    navigate("/registration", { state: { userType: "raider" } });
  };

  const deleteRaider = (ids) => {
    const result = window.confirm(
      "Are you sure you want to perform this action?"
    );
    if (result) {
      api
        .post("/admin/delete-raider", ids)
        .then((res) => {
          if (res.status === 200) {
            alert("Deleted Sucsessfully!");
            window.location.reload();
          } else {
            alert("Something Wrong!");
          }
        })
        .catch((err) => console.error(err));
    } else {
      alert("Cancelled");
    }
  };

  return (
    <div>
      <div className="container mx-auto p-4 h-screen bg-gray-200">
        <div className="overflow-x-auto">
          <h1 className="font-bold text-3xl text-amber-900">Rider Accounts</h1>
          { 
            raidersInfo !== null ?
            <>
            <table className="min-w-full border border-gray-300 text-sm whitespace-nowrap">
            <thead>
              <tr>
                <th className="border-2 border-amber-900 p-2">ID</th>
                <th className="border-2 border-amber-900 p-2">Email</th>
                <th className="border-2 border-amber-900 p-2">Phone Number</th>
                <th className="border-2 border-amber-900 p-2">DriverLicense</th>
                <th className="border-2 border-amber-900 p-2">Username</th>
                <th className="border-2 border-amber-900 p-2">Firstname</th>
                <th className="border-2 border-amber-900 p-2">
                  Middle Name
                </th>
                <th className="border-2 border-amber-900 p-2">Lastname</th>

                {/* <th className="border-2 border-amber-900 p-2">Municipality</th>
                <th className="border-2 border-amber-900 p-2">Brgy</th>
                <th className="border-2 border-amber-900 p-2">
                  Street & House#
                </th> */}
                {/* <th className="border-2 border-amber-900 p-2">Status</th>? */}
                <th className="border-2 border-amber-900 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {raidersInfo.map((raiderInfo) => {
                return (
                  <Fragment key={raiderInfo._id}>
                    <React.Suspense fallback={<LoadingPage />}>
                      <tr>
                        <td className="border border-amber-900 p-2">
                          {raiderInfo._id}
                        </td>
                        <td className="border border-amber-900 p-2">
                          {raiderInfo.Account.Email}
                        </td>
                        <td className="border border-amber-900 p-2">
                          {raiderInfo.Pnumber}
                        </td>
                        <td className="border border-amber-900 p-2">
                         <a className="text-green-900" href = {`http://localhost:3000/img/RaiderLisence/${raiderInfo.DriverLicense}`} target="_blank">View</a>
                        </td>
                        <td className="border border-amber-900 p-2">
                          {raiderInfo.Uname}
                        </td>
                        <td className="border border-amber-900 p-2">
                          {raiderInfo.Fname}
                        </td>
                        <td className="border border-amber-900 p-2">
                          {raiderInfo.Mname}
                        </td>
                        <td className="border border-amber-900 p-2">
                          {raiderInfo.Lname}
                        </td>

                        {/* <td className="border border-amber-900 p-2">{}</td>
                      <td className="border border-amber-900 p-2">
                        Poblacion 1
                      </td>
                      <td className="border border-amber-900 p-2">
                        04-241 Kanto Tinyo
                      </td> */}
                        {/* <td className="border border-amber-900 p-2">Rider</td> */}
                        <td className="border border-amber-900 p-2">
                          <button
                            className="bg-red-600 font-bold text-white px-2 py-0 ml-2 mt-0 rounded hover:bg-red-700 focus:outline-none"
                            onClick={() => {
                              deleteRaider({
                                user_id: raiderInfo._id,
                                acc_id: raiderInfo.AccountID,
                                addr_id: raiderInfo.AddressID,
                              });
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </React.Suspense>
                  </Fragment>
                );
              })}
            </tbody>
          </table>
          <button
            onClick={addRaider}
            className="flex items-center justify-center mt-2 bg-amber-900 font-bold text-white px-4 py-2 rounded hover:bg-amber-950 focus:outline-none ml-2"
          >
            Add Account
          </button>
          </>: <LoadingPage/>
          }
          
        </div>
      </div>
    </div>
  );
}

export default RiderAccounts;
