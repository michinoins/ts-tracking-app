import { Project } from "./Project";

import React, { SyntheticEvent, useEffect, useState } from "react";
interface ProjectFormProps {
  project: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

function ProjectForm({
  onSave,
  onCancel,
  project: initialProject,
}: ProjectFormProps) {
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    budget: "",
  });
  const [project, setProject] = useState(initialProject);
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!isValid()) return;
    onSave(project);
  };

  const handleChange = (event: any) => {
    const { type, name, value, checked } = event.target;
    // if input type is checkbox use checked
    // otherwise it's type is text, number etc. so use value
    let updatedValue = type === "checkbox" ? checked : value;

    //if input type is number convert the updatedValue string to a +number
    if (type === "number") {
      updatedValue = Number(updatedValue);
    }
    const change = {
      [name]: updatedValue,
    };
    console.log("name is " + name);

    let updatedProject: Project;
    // need to do functional update b/c
    // the new project state is based on the previous project state
    // so we can keep the project properties that aren't being edited +like project.id
    // the spread operator (...) is used to
    // spread the previous project properties and the new change
    setProject((p) => {
      console.log("p is:" + JSON.stringify(p));
      console.log("change is:" + JSON.stringify(change));
      updatedProject = new Project({ ...p, ...change });
      console.log("updated is: " + JSON.stringify(updatedProject));
      return updatedProject;
    });
  };

  useEffect(() => {
    setErrors(validate(project));
  }, [project]);

  function validate(project: Project) {
    let errors: any = { name: "", description: "", budget: "" };

    console.log("in valid projct: " + JSON.stringify(project));

    if (project.name.length === 0) {
      errors.name = "Name is required";
    }
    if (project.name.length > 0 && project.name.length < 3) {
      errors.name = "Name needs to be at least 3 characters.";
    }
    if (project.description.length === 0) {
      errors.description = "Description is required.";
    }
    if (project.budget === 0) {
      errors.budget = "Budget must be more than $0.";
    }
    return errors;
  }

  function isValid() {
    return (
      errors.name.length === 0 &&
      errors.description.length === 0 &&
      errors.budget.length === 0
    );
  }

  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      <label htmlFor="name">Project Name</label>
      <input
        type="text"
        name="name"
        value={project.name}
        onChange={handleChange}
        placeholder="enter name"
      />
      {errors.name.length > 0 && (
        <div className="card error">
          <p>{errors.name}</p>
        </div>
      )}
      <label htmlFor="description">Project Description</label>
      <textarea
        name="description"
        value={project.description}
        onChange={handleChange}
        placeholder="enter description"
      />
      {errors.description.length > 0 && (
        <div className="card error">
          <p>{errors.description}</p>
        </div>
      )}
      <label htmlFor="budget">Project Budget</label>
      <input
        type="number"
        name="budget"
        value={project.budget}
        onChange={handleChange}
        placeholder="enter budget"
      />
      {errors.budget.length > 0 && (
        <div className="card error">
          <p>{errors.budget}</p>
        </div>
      )}
      <label htmlFor="isActive">Active?</label>
      <input
        type="checkbox"
        name="isActive"
        checked={project.isActive}
        onChange={handleChange}
      />
      <div className="input-group">
        <button className="primary bordered medium">Save</button>
        <span />
        <button type="button" className="bordered medium " onClick={onCancel}>
          cancel
        </button>
      </div>
    </form>
  );
}

export default ProjectForm;
