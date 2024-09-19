const User = require('../models/userModel');

// Obtenir tous les utilisateurs
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Récupérer tous les utilisateurs dans MongoDB
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
    console.error(error.stack);
  }
};

// Obtenir un utilisateur par son ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Chercher l'utilisateur par ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
    console.error(error.stack);
  }
};

module.exports = { getAllUsers, getUserById };
