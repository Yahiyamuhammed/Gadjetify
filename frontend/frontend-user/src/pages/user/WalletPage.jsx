import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { useWallet } from '@/hooks/queries/useWalletQueries';

const WalletPage = () => {
  const { data, isLoading, error } = useWallet();

  const balance = data?.balance || 0;
  const transactions = data?.transactions || [];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 font-inter">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">My Wallet</h1>
        <p className="text-gray-600 mt-2">View your balance and transaction history</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
          <p className="ml-3 text-lg text-gray-600">Loading wallet data...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-600 font-medium text-lg">
          Failed to load wallet data. Please try again.
        </div>
      ) : (
        <>
          <Card className="mb-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Available Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{formatCurrency(balance)}</h2>
                <button
                  className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-full font-medium transition-colors shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75"
                  onClick={() => alert("Add Funds functionality coming soon!")}
                >
                  Add Funds
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl">Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction._id}>
                      <TableCell>
                        <div className="font-medium">{transaction.description}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          Order: {transaction.relatedOrderId?.slice(0, 8)}...
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(transaction.createdAt)}</TableCell>
                      <TableCell
                        className={`text-right font-semibold text-lg ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {transaction.type === 'credit' ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {transactions.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No transactions found.
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default WalletPage;
