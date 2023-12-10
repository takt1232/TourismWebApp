/* eslint-disable no-unused-vars */
import { Box, Button, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TopBar from "scenes/widgets/TopBar";

const AdminManageUser = () => {
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state?.token);

  const [accounts, setAccounts] = useState({});

  const getAllAccount = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:3001/tourists/", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    if (data) {
      setAccounts(data);
      setLoading(false);
    }
  };

  const deleteAccount = async (accountId) => {
    const response = await fetch(
      `http://localhost:3001/tourists/delete/${accountId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    if (data) {
      window.location.reload();
    }
  };

  useEffect(() => {
    getAllAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <>
        <TopBar />
        <Box padding={"2rem"}>
          <Box
            display={"flex"}
            justifyContent={"center"}
            padding={"1rem 0rem 1rem 2rem"}
          >
            <Typography
              variant="h4"
              sx={{ color: "#7D7D7D", fontWeight: "bold" }}
            >
              ADMIN MANAGE USERS
            </Typography>
          </Box>

          <Box
            boxShadow={"0px 0px 4px 2px rgba(0, 0, 0, 0.1)"}
            borderRadius={"5px"}
          >
            <Box padding={"1rem"}>
              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                mb={"1rem"}
              >
                <Typography variant="h3">USERS</Typography>
              </Box>
              <Divider sx={{ mb: "1rem" }} />
              <Box
                display={"flex"}
                flexDirection={"row"}
                flexWrap={"wrap"}
                gap={"2rem"}
              >
                {loading ? (
                  <Typography variant="h3">Loading...</Typography>
                ) : (
                  accounts?.map((account, index) => (
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      minWidth={"300px"}
                      maxWidth={"300px"}
                      minHeight={"300px"}
                      maxHeight={"300px"}
                      gap={"0.5rem"}
                      key={index}
                    >
                      <Box width={"100%"} height={"200px"}>
                        <img
                          src={`http://localhost:3001/assets/${account?.image}`}
                          alt="account-img"
                          style={{
                            width: "300px",
                            height: "200px",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                      <Typography variant="h4">
                        {account?.firstName.toUpperCase()}{" "}
                        {account?.lastName.toUpperCase()}
                      </Typography>
                      <Typography variant="h5">{account?.email}</Typography>
                      <Button
                        onClick={() => deleteAccount(account?._id)}
                        sx={{
                          backgroundColor: "#B63332",
                          color: "#ffffff",
                          padding: "0.5rem",
                          "&:hover": {
                            backgroundColor: "#B63332",
                          },
                        }}
                      >
                        DELETE ACCOUNT
                      </Button>
                    </Box>
                  ))
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </>
    </Box>
  );
};

export default AdminManageUser;
