"use client";
import { Factory, Microscope, UserRoundSearch } from "lucide-react";
import Link from "next/link";

export const sections = [
  {
    title: "قسم ورش التدريب",
    slug: "(Trining Workshop Section)",
    description: "هو قسم مخصص لإقامة الدورات وورش العمل",
    icon: <UserRoundSearch className="text-gray-500" />,
    link: "/training-workshop",
  },
  {
    title: "قسم معمل التصنيع ",
    slug: "(Fabrication Laboratory Section)",
    description: "يحتوي على أجهزة تصنيع ومعدات وأدوات تقنية",
    icon: <Factory className="text-gray-500" />,
    link: "/factory-laboratory",
  },
  {
    title: "قسم البحث والدراسة ",
    slug: "(Research and Study Section)",
    description:
      "قسم يهدف إلى توفير بيئة مناسبة للباحثين والمبتكرين لإنجاز أعمالهم",
    icon: <Microscope className="text-gray-500" />,
    link: "/research-and-study",
  },
];

const Main = () => {
  const user = JSON.parse(localStorage.getItem("user") as string);

  return (
    <div className="relative mt-5">
      <div className="max-w-[900px] py-10 px-5 mx-auto rounded-[10px] bg-[#F5F5F5] ">
        <div className="flex flex-col items-center justify-center gap-5 mb-10">
          <h2 className="text-3xl font-bold text-primary">
            مركز سلام للبحث والابتكار التقني
          </h2>
          <p className="text-base text-center">
            وجهتك المثالية لاستكشاف دورات تدريبية متخصصة، والاستفادة من غرف
            البحث المجهزة بأحدث التقنيات، وخدمات الطباعة ثلاثية الأبعاد
            المتطورة. سهّل حجزك وإرسال طلباتك بسهولة من خلال البريد الإلكتروني،
            واستمتع بخدمات مبتكرة تلبي احتياجاتك التقنية والتعليمية.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 place-items-center">
          {sections.map((section, index) => (
            <div
              key={index}
              className="w-full h-[300px] flex items-center justify-center flex-col gap-4 hover:scale-105 transition-all duration-300 hover:shadow-lg px-2"
            >
              <div className="flex items-center justify-center text-primary">
                {section.icon}
              </div>
              <div className="w-full flex items-center justify-center flex-col gap-1">
                <h3 className="text-lg font-bold text-center">
                  {section.title}
                </h3>
                <p className="text-sm font-semibold text-center">
                  {section.slug}
                </p>
              </div>
              <p className="text-sm text-gray-500 text-center">
                {section.description}
              </p>
              <Link href={!user ? "/login" : section.link}>
                <button className="bg-main text-white py-2 px-4 rounded-md">
                  المزيد
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
