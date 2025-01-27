// Middleware para validar productos en POST
export const validateInputProductsPost = (req, res, next) => {
  console.log('Validando datos para POST');

  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;

  // Verificar que todos los campos requeridos están presentes
  if (
    !title ||
    !description ||
    !code ||
    price === undefined ||
    status === undefined ||
    stock === undefined ||
    !category ||
    !Array.isArray(thumbnails)
  ) {
    return res.status(400).send({
      message: 'Faltan algunos parámetros o son incorrectos',
    });
  }

  // Validar tipos de datos
  if (
    typeof title !== 'string' ||
    typeof description !== 'string' ||
    typeof code !== 'string' ||
    typeof price !== 'number' ||
    typeof status !== 'boolean' ||
    typeof stock !== 'number' ||
    typeof category !== 'string' ||
    !thumbnails.every((thumb) => typeof thumb === 'string')
  ) {
    return res.status(400).send({
      message: 'Los parámetros tienen tipos de datos inválidos',
    });
  }

  next();
};

// Middleware para validar productos en PUT
export const validateInputProductsPut = (req, res, next) => {
  console.log('Validando datos para PUT');

  const allowedFields = [
    'title',
    'description',
    'code',
    'price',
    'status',
    'stock',
    'category',
    'thumbnails',
  ];

  const updates = Object.keys(req.body);

  // Verificar que solo se envíen campos permitidos
  const isValidUpdate = updates.every((key) => allowedFields.includes(key));
  if (!isValidUpdate) {
    return res.status(400).send({
      message: 'Se enviaron campos no válidos en la actualización',
    });
  }

  // Validar tipos de datos para los campos enviados
  if (req.body.title && typeof req.body.title !== 'string') {
    return res.status(400).send({ message: 'El título debe ser un string' });
  }

  if (req.body.description && typeof req.body.description !== 'string') {
    return res.status(400).send({
      message: 'La descripción debe ser un string',
    });
  }

  if (req.body.code !== undefined && typeof req.body.code !== 'number') {
    return res.status(400).send({ message: 'El código debe ser un número' });
  }

  if (req.body.price !== undefined && typeof req.body.price !== 'number') {
    return res.status(400).send({ message: 'El precio debe ser un número' });
  }

  if (req.body.status !== undefined && typeof req.body.status !== 'boolean') {
    return res.status(400).send({
      message: 'El estado debe ser un booleano',
    });
  }

  if (req.body.stock !== undefined && typeof req.body.stock !== 'number') {
    return res.status(400).send({ message: 'El stock debe ser un número' });
  }

  if (req.body.category && typeof req.body.category !== 'string') {
    return res.status(400).send({
      message: 'La categoría debe ser un string',
    });
  }

  if (
    req.body.thumbnails &&
    (!Array.isArray(req.body.thumbnails) ||
      !req.body.thumbnails.every((thumb) => typeof thumb === 'string'))
  ) {
    return res.status(400).send({
      message: 'Thumbnails debe ser un array de strings',
    });
  }

  next();
};

