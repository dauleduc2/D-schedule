import React, { useEffect } from "react";
import "./style.css";
import { Button, FormControlLabel, MenuItem, Radio } from "@material-ui/core";
import {
  renderTextField,
  renderSelectField,
  radioButton,
} from "../../commons/reduxFormWithMeterialUi";
import * as configInformation from "../../commons/configInformation";
import { Field, reduxForm } from "redux-form";
import { connect, useDispatch } from "react-redux";
import * as dayScheduleActions from "../../actions/dayScheduleActions";
function AddPage(props) {
  let {
    handleSubmit,
    reset,
    pristine,
    submitting,
    daySelected,
    monthSelected,
    yearSelected,
    editting,
    initialValues,
  } = props;
  let isChangeTime = false;
  let initialTime = initialValues?.time;
  useEffect(() => {}, []);

  const dispatch = useDispatch();
  let onCancel = () => {
    let addPage = document.getElementsByClassName("addPageWrapper")[0];
    let grayLayer = document.getElementById("grayLayerWrapper");
    addPage.style.display = "none";
    grayLayer.style.display = "none";
    if (editting) {
      dispatch(dayScheduleActions.resetEditting());
    }
  };

  let renderMenuItem = () => {
    let result;
    result = configInformation.timeList.map((time, index) => (
      <MenuItem value={time} key={index}>
        {time}
      </MenuItem>
    ));
    return result;
  };
  let onHandleSubmit = (value) => {
    value.daySelected = daySelected;
    value.monthSelected = monthSelected;
    value.yearSelected = yearSelected;
    if (editting) {
      dispatch(dayScheduleActions.updateTask(value, initialTime));
    } else {
      dispatch(dayScheduleActions.addTask(value));
    }
    reset();
    let grayLayer = document.getElementById("grayLayerWrapper");
    let addPage = document.getElementsByClassName("addPageWrapper");
    if (addPage) {
      addPage[0].style.display = "none";
    }
    if (grayLayer) {
      grayLayer.style.display = "none";
    }
  };
  let onChangeTime = () => {
    isChangeTime = true;
  };
  return (
    <div className="addPageWrapper">
      {editting ? (
        <div className="title">Update events</div>
      ) : (
        <div className="title">Add events</div>
      )}
      <form
        className="formWrapper"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onHandleSubmit)}
      >
        <Field
          name="name"
          component={renderTextField}
          className="field"
          label="Name of task"
        />
        <Field
          name="place"
          component={renderTextField}
          className="field"
          label="Place"
        />
        <Field
          name="description"
          component={renderTextField}
          className="field"
          label="Description"
        />

        <Field
          className="field"
          name="time"
          component={renderSelectField}
          label="Time"
          onChange={onChangeTime}
        >
          {renderMenuItem()}
        </Field>

        <Field
          name="importance"
          className="field"
          RadioGroupClassName="importanceSelectionWrapper"
          component={radioButton}
        >
          <FormControlLabel
            value="Important"
            control={<Radio />}
            label="important"
            className="importanceSelection"
          />
          <FormControlLabel
            value="Not important"
            control={<Radio />}
            label="not important"
            className="importanceSelection "
          />
        </Field>

        <div className="field buttonWrapper">
          <Button
            variant="contained"
            color="secondary"
            className="cancelButton"
            onClick={() => onCancel()}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="confirmButton"
            type="submit"
            disabled={pristine || submitting}
          >
            Confirm
          </Button>
        </div>
      </form>
    </div>
  );
}

const validate = (values) => {
  const errors = {};

  if (!values.time) {
    errors.time = "Required";
  }
  if (!values.name) {
    errors.name = "Required";
  }
  return errors;
};

AddPage = reduxForm({
  form: "addForm",
  enableReinitialize: true,
  validate,
})(AddPage);
AddPage = connect((state) => {
  return {
    initialValues: state.daySchedule.dataEditting,
  };
})(AddPage);

export default AddPage;
