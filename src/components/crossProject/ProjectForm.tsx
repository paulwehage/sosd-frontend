import React, { useState, useEffect, FC, ChangeEvent } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Chip, Box } from '@mui/material';
import { Project, ProjectFormData } from '../../services/projects/project.interface';

// Interface defining the props for `ProjectForm` component
interface ProjectFormProps {
  project?: Project | null; // Existing project details, if editing
  open: boolean; // Boolean to control the dialog's visibility
  onClose: () => void; // Callback to close the dialog
  onSubmit: (data: ProjectFormData) => void; // Callback to handle form submission
}

// Functional component for rendering a form to create or edit a project
const ProjectForm: FC<ProjectFormProps> = ({ project, open, onClose, onSubmit }) => {
  // State for form data, initialized with empty values or populated when editing
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    description: '',
    tags: []
  });

  // State for handling a new tag input
  const [newTag, setNewTag] = useState('');

  // Populate form data if `project` prop changes (i.e., when editing a project)
  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description,
        tags: project.tags.map(tag => tag.name) // Convert project tags to string array
      });
    } else {
      setFormData({ name: '', description: '', tags: [] }); // Reset form data if no project
    }
  }, [project]);

  // Handle changes to text fields (name and description)
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target; // Extract name and value from input
    setFormData(prev => ({ ...prev, [name]: value })); // Update corresponding form field
  };

  // Handle adding a new tag to the form data
  const handleAddTag = () => {
    if (newTag && !formData.tags.includes(newTag)) { // Check if the new tag is not empty and not a duplicate
      setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
      setNewTag(''); // Reset new tag input field
    }
  };

  // Handle removing a tag from the form data
  const handleDeleteTag = (tagToDelete: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToDelete) // Remove the tag from the array
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    onSubmit(formData); // Call the onSubmit callback with form data
    onClose(); // Close the dialog after submission
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      {/* Dialog title changes based on whether a project is being edited or created */}
      <DialogTitle id="form-dialog-title">{project ? 'Edit Project' : 'Add New Project'}</DialogTitle>
      <DialogContent>
        {/* Form to handle input fields */}
        <form onSubmit={handleSubmit}>
          {/* Text field for project name */}
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Project Name"
            type="text"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            required
          />
          {/* Text field for project description */}
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
          />
          {/* Input for adding new tags and button to trigger adding */}
          <Box sx={{ mt: 2, mb: 1 }}>
            <TextField
              label="Add Tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())} // Add tag on Enter key
            />
            <Button onClick={handleAddTag}>Add</Button>
          </Box>
          {/* Display tags as `Chip` components with delete functionality */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {formData.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onDelete={() => handleDeleteTag(tag)} // Delete tag on click
              />
            ))}
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        {/* Cancel button to close the dialog without submitting */}
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        {/* Submit button to create or update project based on form data */}
        <Button onClick={handleSubmit} color="primary">
          {project ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectForm;
