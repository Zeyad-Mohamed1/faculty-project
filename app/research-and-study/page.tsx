import DeviceBookingForm from "@/components/forms/device-reservation";

const TrainingWorkshop = () => {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl text-center font-bold mb-8">نموذج حجز جهاز</h1>
      <DeviceBookingForm />
    </main>
  );
};

export default TrainingWorkshop;
