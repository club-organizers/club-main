'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import supabase from '../../../../supabaseClient';
import { useSession } from 'next-auth/react';

const EditClubPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession(); // Retrieve session data here
  const currentUserEmail = session?.user?.email; // Extract the current user's email

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    contact_person: '',
    email: '',
  });
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClubDetails = async () => {
      const { data, error } = await supabase
        .from('clubs')
        .select('name, description, type, contact_person, email')
        .eq('id', id)
        .single();

      if (data) {
        setFormData(data);
      } else {
        console.error('Error fetching club details:', error);
        setFormError('Failed to fetch club details.');
      }
    };

    fetchClubDetails();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null); // Clear any previous errors

    if (!formData.name || !formData.description || !formData.type || !formData.contact_person || !formData.email) {
      setFormError('Please fill in all fields.');
      return;
    }

    const { error } = await supabase
      .from('clubs')
      .update(formData)
      .eq('id', id);

    if (!error) {
      try {
        if (!currentUserEmail) {
          setFormError('Failed to identify the current user.');
          return;
        }

        // Update the "club" column in the "User" table to the new club name
        const { error: updateError } = await supabase
          .from('User')
          .update({ club: formData.name }) // Set the club column to the updated club name
          .eq('email', currentUserEmail); // Match the current user's email

        if (updateError) {
          console.error('Error updating user club to the new name:', updateError);
        } else {
          console.log('User club value updated to the new name successfully.');
        }
      } catch (err) {
        console.error('Unexpected error updating user club to the new name:', err);
      }

      alert('Club updated successfully!');
      router.push(`/club/${id}`); // Redirect to the club details page after successful update
    } else {
      console.error('Error updating club:', error);
      setFormError('Failed to update the club. Please try again.');
    }
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <h1 className="text-center">Edit Club Details</h1>
      {formError && <p className="text-danger text-center">{formError}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Club Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDescription" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            required
          />
        </Form.Group>
        <Form.Group controlId="formType" className="mb-3">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formContactPerson" className="mb-3">
          <Form.Label>Contact Person</Form.Label>
          <Form.Control
            type="text"
            name="contact_person"
            value={formData.contact_person}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
};

export default EditClubPage;
