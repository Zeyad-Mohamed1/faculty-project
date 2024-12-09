import TrainingBookingForm from "@/components/forms/training-form";

const TrainingWorkshop = () => {
  return (
    <div className="min-h-screen">
      <h2 className="text-3xl font-bold text-primary text-center my-5">
        حجز ورشة التدريب
      </h2>
      <TrainingBookingForm />
    </div>
  );
};

export default TrainingWorkshop;
