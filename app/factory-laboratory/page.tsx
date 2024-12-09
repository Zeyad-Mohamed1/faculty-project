import ServiceBookingForm from "@/components/forms/service-form";

const TrainingWorkshop = () => {
  return (
    <div className="min-h-screen">
      <h2 className="text-3xl font-bold text-primary text-center my-5">
        طلب خدمة
      </h2>
      <ServiceBookingForm />
    </div>
  );
};

export default TrainingWorkshop;
