import React from "react";
import { Button, Modal, FormGroup, FormLabel } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./NewTask.css";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  startDate: Yup.date().nullable().required("Start Date is required"),
  //endDate: Yup.date().nullable().required("End Date is required"),
  endDate: Yup.date()
    .when(
      "startDate",
      (startDate, schema) =>
        startDate &&
        schema.min(startDate, "End date must be after the start date.")
    )
    .nullable()
    .required("End Date is required"),
});

function TaskForm(props) {
  return (
    <>

      <Formik
        initialValues={props.editedValues|| props.initialValues}
        validationSchema={validationSchema}
        onSubmit={props.onSubmit}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Modal show={props.show} onHide={props.handleClose}>
              <Modal.Header closeButton>
          <Modal.Title>{props.taskState} Task</Modal.Title>
              </Modal.Header>
              <Form>
                <Modal.Body>
                  <FormGroup>
                    <FormLabel>Title</FormLabel>
                    <Field
                      type="text"
                      id="title"
                      name="title"
                      className={`form-control ${
                        formik.touched.title && formik.errors.title
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="title"
                      className="invalid-feedback"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Description</FormLabel>
                    <Field
                      type="text"
                      id="description"
                      name="description"
                      className={`form-control ${
                        formik.touched.description && formik.errors.description
                          ? "is-invalid"
                          : ""
                      }`}
                      as="textarea"
                    />
                    <ErrorMessage
                      component="div"
                      name="description"
                      className="invalid-feedback"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Start Date</FormLabel>

                    <DatePicker
                      selected={formik.values.startDate}
                      name="startDate"
                      id="startDate"
                      onBlur={formik.handleBlur}
                      onChange={(date) =>
                        formik.setFieldValue("startDate", date)
                      }
                      className={`form-control ${
                        formik.touched.startDate && formik.errors.startDate
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="startDate"
                      className="invalid-feedback"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>End Date</FormLabel>
                    <DatePicker
                      selected={formik.values.endDate}
                      name="endDate"
                      onBlur={formik.handleBlur}
                      onChange={(date) => formik.setFieldValue("endDate", date)}
                      className={`form-control ${
                        formik.touched.endDate && formik.errors.endDate
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="endDate"
                      className="invalid-feedback"
                    />
                  </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={props.handleClose}
                    type="reset"
                  >
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>
          );
        }}
      </Formik>
    </>
  );
}

export default TaskForm;
