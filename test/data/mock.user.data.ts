const getUserObject = () => ({
  id: '62d55269dcebde3d0e486e7a',
  firstname: 'John',
  lastname: 'Doe',
  email: 'john@me.com',
  password: '$2b$10$t0emyNftv4THpsP5TzlokO4IBsQYTjZ.IINi1inVyfeI0YvSmNv3m',
  createdAt: '2022-07-18T12:30:33.630Z',
});

const getUserInstance = () => ({
  id: '62d55269dcebde3d0e486e7a',
  firstname: 'John',
  lastname: 'Doe',
  email: 'john@me.com',
  password: '$2b$10$t0emyNftv4THpsP5TzlokO4IBsQYTjZ.IINi1inVyfeI0YvSmNv3m',
  createdAt: '2022-07-18T12:30:33.630Z',
  toJSON: jest.fn(),
});

export { getUserObject, getUserInstance };
