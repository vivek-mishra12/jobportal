import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector(store => store.job);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
      <div className="overflow-x-auto">
        <Table className="min-w-[600px]">
          <TableCaption>A list of your applied jobs</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allAppliedJobs.length >= 0 &&
              allAppliedJobs.map((appliedJob, index) => (
                <TableRow key={appliedJob?._id}>
                  <TableCell>{appliedJob?.createdAt?.split('T')[0]}</TableCell>
                  <TableCell>{appliedJob?.job?.title}</TableCell>
                  <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                  <TableCell className="text-right">
                    <Badge>{appliedJob?.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AppliedJobTable;
