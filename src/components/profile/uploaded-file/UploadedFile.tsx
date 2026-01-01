import React from "react";

import style from "./style.module.scss";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";

interface IUpload {
  cvFile: File | null;
  setCvFile: React.Dispatch<React.SetStateAction<File | null>>;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const UploadFile = ({ cvFile, setCvFile, fileInputRef }: IUpload) => {
  const uploadedFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF or DOC/DOCX files are allowed");
      return;
    }

    setCvFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem("user_cv", reader.result as string);
      localStorage.setItem("user_cv_name", file.name);
    };
    reader.readAsDataURL(file);
  };

  const downloadCv = () => {
    const fileData = localStorage.getItem("user_cv");
    const fileName = localStorage.getItem("user_cv_name");

    if (!fileData || !fileName) return;

    const link = document.createElement("a");
    link.href = fileData;
    link.download = fileName;
    link.click();
  };

  return (
    <>
      <div className={style.profile_row_upload} onClick={uploadedFile}>
        <FaCloudUploadAlt />
        <p>{cvFile ? cvFile.name : "You can click to upload your CV"}</p>
      </div>

      <MdOutlineFileDownload onClick={downloadCv} />

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        hidden
        onChange={handleFileChange}
      />
    </>
  );
};

export default UploadFile;
