// Exemple de faux utilisateurs
const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' }
  ];
  
  // Obtenir tous les utilisateurs
  const getAllUsers = (req, res) => {
    res.status(200).json(users);
  };
  
  // Obtenir un utilisateur par son ID
  const getUserById = (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  };
  
  module.exports = { getAllUsers, getUserById };