import React, { useEffect, useState } from "react";
import { getIsRowSelected, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Box, Stack, Tooltip, IconButton, tableBodyClasses } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";

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
    const [rowSelection, setRowSelection] = useState({});
    const [usersData, setUsersData] = useState([]);

    const fetchUsers = async () => {
        try {
            const users = await getUsers();
            console.log(users);
            setUsersData(users);
            setLoadingTable(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <Box>
            <MaterialReactTable
                columns={columns}
                data={usersData}
                state={{
                    isLoading: loadingTable,
                    rowSelection
                }}
                onRowSelectionChange={setRowSelection}
                initialState={{ density: "compact", showGlobalFilter: true }}
                enableRowSelection={true}

                renderTopToolbarCustomActions={() => (
                    <Stack direction="row" sx={{ m: 1 }}>


                        <Tooltip title="Agregar">
                            <IconButton onClick={() => setAddInventoryShowModal(true)}>
                                <AddCircleIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Editar">
                            <IconButton
                                onClick={() => {
                                    const selectedData = Object.keys(rowSelectionInventories).map((key) => inventoriesData[key]);

                                    if (selectedData.length !== 1) {
                                        alert("Por favor, seleccione una sola fila para editar.");
                                        return;
                                    }

                                    // Pasa solo el ID del inventario seleccionado al modal de actualización
                                    setUpdateInventoryShowModal(true);
                                    setSelectedInventory(selectedData[0]);  // Guardamos el inventario seleccionado
                                }}
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Eliminar">
                            <IconButton onClick={() => {
                                const selectedData = Object.keys(rowSelectionInventories).map((key) => inventoriesData[key]);



                                // Pasa solo el ID del inventario seleccionado al modal de actualización
                                setDeleteInventoryShowModal(true);
                                setSelectedInventory(selectedData);  // Guardamos el inventario seleccionado
                            }}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Detalles">
                            <IconButton onClick={() => {
                                const selectedData = Object.keys(rowSelectionInventories).map((key) => inventoriesData[key]);



                                // Pasa solo el ID del inventario seleccionado al modal de actualización
                                setDetailsInventoryShowModal(true);
                                setSelectedInventory(selectedData);  // Guardamos el inventario seleccionado
                            }}>
                                <InfoIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                )}
            />
        </Box>
    )

}

export default UsersTable