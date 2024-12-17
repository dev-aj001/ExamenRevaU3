import React, { useEffect, useState } from "react";
import { getIsRowSelected, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Box, Stack, Tooltip, IconButton, tableBodyClasses } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tabs, Tab } from "@mui/material";

import { getUsers } from "../../services/getUsers";


const columns = [
    { accessorKey: "id", header: "ID", size: 150 },
    { accessorKey: "email", header: "Email", size: 150 },
    { accessorKey: "first_name", header: "First Name", size: 150 },
    { accessorKey: "last_name", header: "Last Name", size: 150 },
    { accessorKey: "avatar", header: "Avatar", size: 150 },
];

const UsersTable = () => {

    const [loadingTable, setLoadingTable] = useState(true);
    const [rowSelectionInventories, setRowSelectionInventories] = useState({});
    const [usersData, setUsersData] = useState([]);

    const fetchUsers = async () => {
        try {
            const users = await getUsers();
            setUsersData(users);
            setLoadingTable(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <Box>

        </Box>
    )

}

export default UsersTable