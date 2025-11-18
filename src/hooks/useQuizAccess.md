# Hook useQuizAccess

Este hook fornece uma solução agnóstica para controlar o acesso ao quiz baseado na autenticação do usuário.

## Funcionalidades

- ✅ Verifica se o usuário está autenticado
- ✅ Redireciona automaticamente para o quiz se autenticado
- ✅ Exibe modal de autenticação se não autenticado
- ✅ Reutilizável em qualquer componente
- ✅ Consistente em toda a aplicação

## Uso Básico

```tsx
import { useQuizAccess } from '@/hooks/useQuizAccess';
import { AuthRequiredModal } from '@/components/ui/AuthRequiredModal';

function MeuComponente() {
  const { handleQuizAccess, showAuthModal, closeAuthModal } = useQuizAccess();

  return (
    <div>
      <button onClick={handleQuizAccess}>
        Começar Quiz
      </button>
      
      <AuthRequiredModal 
        isOpen={showAuthModal} 
        onClose={closeAuthModal} 
      />
    </div>
  );
}
```

## Uso com Redirecionamento Customizado

```tsx
const { handleQuizAccess, showAuthModal, closeAuthModal } = useQuizAccess('/quiz/custom');
```

## Funções Utilitárias

### checkQuizAccess()
Verifica se o usuário pode acessar o quiz.

```tsx
import { checkQuizAccess } from '@/utils/quizAccess';

const canAccess = checkQuizAccess();
```

### getQuizAccessMessage()
Retorna a mensagem padrão para usuários não autenticados.

```tsx
import { getQuizAccessMessage } from '@/utils/quizAccess';

const message = getQuizAccessMessage();
```

### getQuizAccessInfo()
Retorna informações completas sobre o acesso.

```tsx
import { getQuizAccessInfo } from '@/utils/quizAccess';

const accessInfo = getQuizAccessInfo({
  customMessage: 'Mensagem customizada',
  redirectTo: '/quiz/custom'
});
```

## Componentes Integrados

### AuthRequiredModal
Modal que exibe opções de autenticação usando o componente `AuthGroupButtons`.

```tsx
<AuthRequiredModal 
  isOpen={showAuthModal} 
  onClose={closeAuthModal}
  title="Título Customizado"
  message="Mensagem customizada"
/>
```

## Fluxo de Funcionamento

1. **Usuário clica no botão "Começar Quiz"**
2. **Hook verifica `isAuthenticated`**
3. **Se autenticado**: redireciona para `/quiz`
4. **Se não autenticado**: abre modal com opções de login/cadastro
5. **Após autenticação bem-sucedida**: redireciona automaticamente para `/quiz`

## Vantagens

- **Agnóstico**: Pode ser usado em qualquer componente
- **Reutilizável**: Lógica centralizada
- **Consistente**: Mesma experiência em toda a aplicação
- **Flexível**: Permite customização
- **Manutenível**: Código organizado e documentado
