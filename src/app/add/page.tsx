"use client";

import type React from "react";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import supabase from "../../../supabaseClient";

const Add = () => {
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
  const [currentUserClub, setCurrentUserClub] = useState<string | null>(null);

  const { data: session } = useSession();
  const currentUser = session?.user?.email;

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!currentUser) return;

      try {
        const { data, error } = await supabase
          .from("User")
          .select("role, club") // Fetch both role and club
          .eq("email", currentUser)
          .single(); // Fetch a single row

        if (error) {
          console.error("Error fetching user details:", error);
        } else if (data) {
          setCurrentUserRole(data.role); // Set the role from the database
          setCurrentUserClub(data.club); // Set the club from the database
        }
      } catch (err) {
        console.error("Unexpected error fetching user details:", err);
      }
    };

    fetchUserDetails();
  }, [currentUser]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    contact_person: "",
    email: "",
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);
  
    console.log("Form Data to Submit:", formData);
  
    // Validate form fields
    if (!formData.name || !formData.description || !formData.type || !formData.contact_person || !formData.email) {
      setFormError("Please fill in all fields.");
      setIsSubmitting(false);
      return;
    }
  
    try {
      // If the user is an OWNER, update their "club" column in the User table
      if ((currentUserRole === "OWNER" && currentUserClub === null) || currentUserRole === "ADMIN") {
        try {
          const { error: updateError } = await supabase
            .from("User")
            .update({ club: formData.name }) // Update the "club" column with the new club name
            .eq("email", currentUser); // Match the current user's email
  
          if (updateError) {
            console.error("Error updating club for OWNER:", updateError);
          } else {
            console.log("Club updated successfully for OWNER:", formData.name);
            setCurrentUserClub(formData.name); // Update the local state
          }
        } catch (err) {
          console.error("Unexpected error updating club for OWNER:", err);
        }
      } else {
        setFormError("Account doesn't have club registration permission.");
        setIsSubmitting(false); // Reset the submitting state
        return; // Exit the function early to prevent further execution
      }
  
      // Insert data into Supabase and return the inserted data
      const { data, error } = await supabase.from("clubs").insert([formData]).select(); // Add .select() to return the inserted data
  
      if (error) {
        console.error("Supabase error details:", error);
        setFormError(`Failed to add the club: ${error.message}`);
      } else if (data) {
        console.log("Successfully added club:", data);
        setSuccessMessage("Club added successfully!");
  
        // Reset the form
        setFormData({
          name: "",
          description: "",
          type: "",
          contact_person: "",
          email: "",
        });
      } else {
        // This case handles when there's no error but also no data returned
        setFormError("No response from the server. Please try again.");
      }
    } catch (err) {
      // This catches any other errors that might occur
      console.error("Unexpected error:", err);
      setFormError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <Container style={{ marginTop: "20px" }}>
        <Row className="justify-content-center">
          <Col xs={8}>
            <h1 className="text-center">Add a New Club</h1>
            {formError && <p className="text-danger text-center">{formError}</p>}
            {successMessage && <p className="text-success text-center">{successMessage}</p>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Club Name</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} required />
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
                <Form.Control type="text" name="type" value={formData.type} onChange={handleInputChange} required />
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
                <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} required />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Club"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Add;