import { EmptyState, VStack } from "@chakra-ui/react"
import {FaGear} from 'react-icons/fa6'
export default function Empty() {
    return (
        <EmptyState.Root backgroundColor={'white'} rounded={'lg'}>
            <EmptyState.Content>
                <EmptyState.Indicator>
                    <FaGear />
                </EmptyState.Indicator>
                <VStack textAlign="center">
                    <EmptyState.Title>Data is empty</EmptyState.Title>
                    <EmptyState.Description>
                        Add new first to show in this page
                    </EmptyState.Description>
                </VStack>
            </EmptyState.Content>
        </EmptyState.Root>

    )
}