"use client";
import Choice from "@/components/Choice";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const selectOptions = [
  { label: "dollar", value: "dollar" },
  {
    label: "number",
    value: "number",
  },
  {
    label: "string",
    value: "string",
  },
  {
    label: "boolean",
    value: "boolean",
  },
];

type FormData = {
  title: string;
  question: string;
  choice1Text: string;
  choice2Text: string;
  choice1Type: string;
  choice2Type: string;
};

const validationSchema = Yup.object({
  title: Yup.string().required("required"),
  question: Yup.string().required("required"),
  choice1Text: Yup.string().required("required"),
  choice2Text: Yup.string().required("required"),
  choice1Type: Yup.string()
    .oneOf(["dollar", "number", "string", "boolean"])
    .required("required"),
  choice2Type: Yup.string()
    .oneOf(["dollar", "number", "string", "boolean"])
    .required("required"),
});

export default function Home() {
  const [formData, setFormData] = useState<FormData>();

  const {
    values,
    handleChange,
    setFieldValue,
    touched,
    errors,
    handleBlur,
    isValid,
    submitForm,
    dirty,
  } = useFormik({
    initialValues: {
      title: "",
      question: "",
      choice1Text: "",
      choice2Text: "",
      choice1Type: "",
      choice2Type: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      setFormData(values);
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Dialog defaultOpen>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>

            <DialogDescription>
              Make changes to your profile here. Click save when youre done.
            </DialogDescription>
          </DialogHeader>

          <Input
            label="title"
            id="title"
            onChange={handleChange}
            value={values.title}
            name="title"
            errorMessage={touched.title && errors.title}
            onBlur={handleBlur}
            className="mt-7 mb-5"
          />

          <Button
            onClick={() =>
              !errors.title && setFieldValue("question", values.title)
            }
            className="w-full"
          >
            add question
          </Button>

          {values.question && (
            <>
              <Choice
                selectOptions={selectOptions}
                txtInputId="text1"
                txtInputLabel="text1"
                selectValue={values.choice1Type}
                txtValue={values.choice1Text}
                txtOnChange={handleChange}
                txtOnBlur={handleBlur}
                txtErrorMessage={touched.choice1Text && errors.choice1Text}
                selectOnChange={(value) => setFieldValue("choice1Type", value)}
                txtInputName="choice1Text"
                selectInputName="choice1Type"
                className="mt-7"
              />

              <Choice
                txtInputName="choice2Text"
                selectInputName="choice2Type"
                selectOptions={selectOptions}
                txtInputId="choice2"
                txtInputLabel="choice2"
                className="h-fit mt-7 mb-7"
                selectValue={values.choice2Type}
                txtValue={values.choice2Text}
                txtOnChange={handleChange}
                txtOnBlur={handleBlur}
                txtErrorMessage={touched.choice2Text && errors.choice2Text}
                selectOnChange={(value) => setFieldValue("choice2Type", value)}
              />
            </>
          )}

          <DialogFooter>
            {isValid && dirty && (
              <Button className="w-full" onClick={submitForm}>
                save
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
