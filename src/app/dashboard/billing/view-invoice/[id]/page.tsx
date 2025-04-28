/* eslint-disable @next/next/no-img-element */
"use client";
import DashboardLayout from "@/layouts/dashboard-layout";
import { useRouter } from "next/navigation";
import React from "react";
import "./style.css";

const ViewInvoice = () => {
  const router = useRouter();

  const handleBack = (): void => {
    router.push("/dashboard/billing");
  };

  return (
    <DashboardLayout pageClass="view-invoice-module" pageTag="Management">
      <div className="space-y-6 ">
        <div className="back-button " onClick={handleBack}>
          <img src="/assets/icons/arrow-left.svg" alt="arrow left" />
          <span>Back</span>
        </div>
        <div className="flex justify-between">
          <div>
            <h2 className="title">Invoice #001 - SourceID</h2>
            <h6 className="description">Invoice details</h6>
          </div>
          <div className="flex gap-4 items-center">
            <button className="flex gap-1 items-center font-semibold text-[#414651] text-sm border-[#D5D7DA] border rounded-md px-3 py-1">
              <img
                src="/assets/icons/print.svg"
                alt="print-icon"
                className="icon"
              />
              Print
            </button>
            <button className="flex gap-1 items-center font-semibold text-[#414651] text-sm border-[#D5D7DA] border rounded-md px-3 py-1">
              <img
                src="/assets/icons/xport.svg"
                alt="print-icon"
                className="icon"
              />
              Export
            </button>
          </div>
        </div>

        <div className="bg-[#F8F7FC] rounded-xl p-8  space-y-8">
          <div className="flex justify-between">
            <div className="space-y-1">
              <h2 className="title">SourceID</h2>
              <p>123 Lane, Lagos</p>
              <p>charlse@sourceid.tech</p>
              <p>+34 500 090 0000</p>
            </div>

            <div className="flex flex-col items-start md:items-end space-y-2 mt-4 md:mt-0 pr-14">
              <div className="flex items-center justify-between w-60">
                <h6>Status</h6>
                <span className="bg-[#CFF9CD] text-[#3FB85D] px-3 py-1 rounded-sm text-sm font-semibold">
                  Paid
                </span>
              </div>
              <div className="flex items-center justify-between w-60">
                <h6>Issued</h6>
                <p>April 1, 2025</p>
              </div>
              <div className="flex items-center justify-between w-60">
                <h6>Due </h6>
                <p>April 6, 2025</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#D9D9D9] pt-8">
            <div className="space-y-2">
              <h3 className="title">Billed To</h3>
              <p>Providus Bank</p>
              <p>123 Lane, Lagos</p>
              <p>providusbank@admin.com</p>
              <p>+34 500 090 0000</p>
            </div>

            <div className="space-y-2">
              <h3 className="title">Payment Method</h3>
              <p>Visa 2345</p>
              <p>Paid on April 1, 3035</p>
              <p>providusbank@admin.com</p>
              <p>+34 500 090 0000</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="text-gray-600 border-b border-[#D9D9D9]">
                <tr>
                  <th className="py-3">Features</th>
                  <th className="py-3">Users</th>
                  <th className="py-3">Rates</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                <tr className="border-b border-[#D9D9D9]">
                  <td className="py-4">Dashboard</td>
                  <td>20</td>
                  <td>$900</td>
                </tr>
                <tr className="border-b border-[#D9D9D9]">
                  <td className="py-4">Role Management</td>
                  <td>16</td>
                  <td>$200</td>
                </tr>
                <tr className="border-b border-[#D9D9D9]">
                  <td className="py-4">Verification Library</td>
                  <td>20</td>
                  <td>$100</td>
                </tr>
                <tr className="border-b border-[#D9D9D9]">
                  <td className="py-4">Audit Log</td>
                  <td>20</td>
                  <td>$100</td>
                </tr>
                <tr className="border-b border-[#D9D9D9]">
                  <td className="py-4">Subtotal</td>
                  <td>60.0%</td>
                  <td>$100</td>
                </tr>
                <tr className="border-b border-[#D9D9D9]">
                  <td className="py-4">Total</td>
                  <td></td>
                  <td>$1,500</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-gray-700 text-sm pt-3">
            <strong>Note:</strong> Thank you for your continued trust and
            partnership. For any billing questions, email
            <span className=""> billing@superadmin.com</span>.
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewInvoice;
