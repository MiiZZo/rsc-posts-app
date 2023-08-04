import { z } from 'zod';


const SignUpFailResponseContract = createFailResponseContract(
  z.literal(''),
  z.literal(''),
);
