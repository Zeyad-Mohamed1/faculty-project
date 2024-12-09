import React from "react";
import Image from "next/image";
import { MailIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0a8016] text-white py-4 ">
      <div className="md:w-[70%] mx-auto">
        {/* First Section */}
        <div className="flex flex-col items-center justify-center ">
          <Image
            width={70}
            height={70}
            src="https://firebasestorage.googleapis.com/v0/b/sec-project-368ee.appspot.com/o/2664581-1494648939.png?alt=media&token=e259f1f9-f990-4a4b-be5a-fdac69f3b7df"
            alt="Right Logo"
            className="h-[70px] bg-white rounded-lg mx-auto mb-4"
          />
          <h3 className="text-xl text-center font-bold text-white">
            مركز سلام للبحث والابتكار التقني
          </h3>
          <p
            className="text-sm text-center text-white my-3"
            style={{ lineHeight: "1.5" }}
          >
            استكشف دوراتنا التدريبية، غرف البحث، وخدمات الطباعة ثلاثية الأبعاد.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p
            className="text-sm text-white mt-5"
            style={{ lineHeight: "1.5", fontSize: "0.875rem" }}
          >
            جميع الحقوق محفوظة © مركز سلام للبحث والابتكار 2024
          </p>
          <div className="flex flex-col items-center justify-center gap-2">
            <p
              className="text-sm text-white"
              style={{ lineHeight: "1.5", fontSize: "0.875rem" }}
            >
              تواصل معنا
            </p>
            <div
              className="text-sm text-white flex items-center"
              style={{ lineHeight: "1.5", fontSize: "0.875rem" }}
            >
              <MailIcon className="ml-1 size-5" /> البريد الإلكتروني:
              Dtcgr-sic@tvtc.gov.sa
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
