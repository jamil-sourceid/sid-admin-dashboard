import { getData, postData } from './api';

// Define a type for the user object
interface User {
  id: number;
  name: string;
  email: string;
}

const fetchUsers = async (): Promise<void> => {
  try {
    const users = await getData<User[]>('/users');
    console.log(users);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const createUser = async (): Promise<void> => {
  try {
    const newUser = await postData<User, { name: string; email: string }>('/users', {
      name: 'John Doe',
      email: 'john@example.com',
    });
    console.log(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

export { fetchUsers, createUser };
