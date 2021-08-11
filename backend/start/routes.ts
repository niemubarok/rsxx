import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { hello: "world" };
});

//PASIEN ROUTE
Route.group(() => {
  Route.get("/all", "PatientController.index");
  Route.post("/", "PatientController.show").middleware("getPatient");
  Route.post("/store", "PatientController.store");
  Route.post("/update", "PatientController.update").middleware("getPatient");
  Route.delete("/delete", "PatientController.destroy").middleware("getPatient");
}).prefix("/patient");

//DOCTOR ROUTE
Route.group(() => {
  Route.get("/all", "DoctorController.index");
  Route.post("/", "DoctorController.show").middleware("getDoctor");
  Route.post("/store", "DoctorController.store");
  Route.post("/update", "DoctorController.update").middleware("getDoctor");
  Route.delete("/delete", "DoctorController.destroy").middleware("getDoctor");
}).prefix("/doctor");

//REGISTRATION
Route.group(() => {
  Route.get("/all", "RegistrationController.index");
  Route.post("/", "RegistrationController.show").middleware("getRegistration");
  Route.post("/store", "RegistrationController.store").middleware(
    "getRegistration"
  );
  Route.post("/update", "RegistrationController.update").middleware(
    "getRegistration"
  );
  Route.delete("/delete", "RegistrationController.destroy").middleware(
    "getRegistration"
  );
}).prefix("/registration");
