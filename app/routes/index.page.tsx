import type { Route } from '../+types/root';

import { HStack, Button, VStack, Text } from '@chakra-ui/react';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Fomula Predictor' }, { name: 'description', content: 'Welcome to Formula Predictor' }];
}

export default function IndexPage() {
  return (
    <main className="text-blue-500">
      <VStack>
        <Text fontSize="4xl" fontWeight="bold" color="blue.500">
          Welcome to Formula Predictor
        </Text>
      </VStack>
    </main>
  );
}
