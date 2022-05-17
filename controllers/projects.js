import { v4 as uuidv4 } from 'uuid';
const projects = [];

export const getProjects = (req, res) => {
  res.send(projects);
};

export const getProject = (req, res) => {
  const foundProject = projects.find(project => project.id === req.params.id);
  res.send(foundProject);
};

export const createProject = (req, res) => {
  const project = {
    id: uuidv4(),
    ...req.body
  };
  projects.push(project);
  res.send(`Inserted project with ID ${project.id}`);
};

export const patchProject = (req, res) => {
  const projectIndex = projects.findIndex(project => project.id === req.params.id);
  if (projectIndex > -1) {
    projects[projectIndex] = {
      ...projects[projectIndex],
      ...req.body
    };
  }
  res.send(`Project with the id ${req.params.id} updated in database`);
};

export const deleteProject = (req, res) => {
  const projectIndex = projects.findIndex(project => project.id === req.params.id);
  if (projectIndex > -1) {
    projects.splice(projectIndex, 1);
  }
  res.send(`Project with the id ${req.params.id} removed from database`);
};