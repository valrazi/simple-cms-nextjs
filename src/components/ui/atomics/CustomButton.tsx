import { Button, ButtonProps } from '@chakra-ui/react'

interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode
}

const CustomButton = ({ children, ...rest }: CustomButtonProps) => {
  return (
    <Button
      fontSize="xs"
      size="xs"
      padding="4"
      {...rest} 
    >
      {children}
    </Button>
  )
}

export default CustomButton