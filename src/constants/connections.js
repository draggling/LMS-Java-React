/*
export const ADMIN_PORT = 'http://localhost:8090/';
export const LIBRARIAN_PORT = 'http://localhost:8090/';
export const BORROWER_PORT = 'http://localhost:8081/';
*/
// http://ec2-3-138-42-102.us-east-2.compute.amazonaws.com // elastic admin-librarian public ipv4 sdns address
// http://ec2-13-58-11-233.us-east-2.compute.amazonaws.com // Borrower EC2 instance

export const ADMIN_PORT = ' http://ec2-3-138-42-102.us-east-2.compute.amazonaws.com:8090/';
export const LIBRARIAN_PORT = ' http://ec2-3-138-42-102.us-east-2.compute.amazonaws.com:8090/';
export const BORROWER_PORT = ' http://ec2-13-58-11-233.us-east-2.compute.amazonaws.com:8080/';