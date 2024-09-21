import React, {useState, useEffect, FC, ChangeEvent} from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Chip, Box } from '@mui/material';
import { Project, ProjectFormData } from '../../services/projects/project.interface';

interface ProjectFormProps {
  project?: Project | null;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectFormData) => void;
}

const ProjectForm: FC<ProjectFormProps> = ({ project, open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    description: '',
    tags: []
  });
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description,
        tags: project.tags.map(tag => tag.name)  // Map to string array
      });
    } else {
      setFormData({ name: '', description: '', tags: [] });
    }
  }, [project]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
      setNewTag('');
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToDelete)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);  // Send formData directly without converting tags
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{project ? 'Edit Project' : 'Add New Project'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
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
          <Box sx={{ mt: 2, mb: 1 }}>
            <TextField
              label="Add Tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
            />
            <Button onClick={handleAddTag}>Add</Button>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {formData.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onDelete={() => handleDeleteTag(tag)}
              />
            ))}
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {project ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectForm;