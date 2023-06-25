import * as yup from 'yup';

const mySchema = yup.object({
  title: yup.string().required().min(3),
  price: yup.number().required(),
  categoryId: yup.number().required()
});
const catSchema = yup.object({
  name: yup.string().required().min(3),
});

const loginSchema = yup.object({
    email: yup.string().required(),
    password: yup
      .string()
      .required()
      .min(8)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.'
      ),
  });



const registerSchema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(8)
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.'
    ),
  passwordRepeat: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required(),
});

export const catValidate = async (req , res, next)=>{
  try {
    await catSchema.validate(req.body);
    next();
  } catch (err) {
    res.status(401);
    console.log(err.message);
    res.send('Unauthorized');
  }
}

export const validate = async (req, res, next) => {
  try {
    await mySchema.validate(req.body);
    next();
  } catch (err) {
    res.status(401);
    console.log(err.message);
    res.send('Unauthorized');
  }
};

export const registerValid = async (req, res, next) => {
  try {
    await registerSchema.validate(req.body);
    next();
  } catch (err) {
    res.status(403);
    console.log(err.message);
    res.send(
      'Email must be a valid email address, password must be at least 8 characters with at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character, and passwordRepeat must match password.'
    );
  }
};

export const loginValid = async (req, res, next) => {
    try {
      await loginSchema.validate(req.body, { abortEarly: false }); // Validate the request body against the 'loginSchema' schema
      next();
    } catch (err) {
      res.status(403);
      console.log(err.message);
      res.send(`If you haven't registered yet, please register first!`);
    }
  };