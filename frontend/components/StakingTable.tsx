/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue } from "@nextui-org/react";
import { users } from "@/lib/data/staking";

export default function App() {
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 6;

    const pages = Math.ceil(users.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return users.slice(start, end);
    }, [page, users]);

    return (
        <Table
            aria-label="Example table with client side pagination"
            bottomContent={
                <div className="flex w-full justify-center border-white">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="secondary"
                        page={page}
                        total={pages}
                        onChange={(page) => setPage(page)}
                    />
                </div>
            }
            classNames={{
                wrapper: "min-h-[222px] bg-[#27272a]",
            }}
        >
            <TableHeader>
                <TableColumn key="no">No</TableColumn>
                <TableColumn key="position id">Position ID</TableColumn>
                <TableColumn key="period">Period</TableColumn>
                <TableColumn key="stake amount">Stake Amount</TableColumn>
                <TableColumn key="reward amount">Reward Amount</TableColumn>
                <TableColumn key="status">Status</TableColumn>
            </TableHeader>
            <TableBody items={items}>
                {(item) => (
                    <TableRow key={item.name}>
                        {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
