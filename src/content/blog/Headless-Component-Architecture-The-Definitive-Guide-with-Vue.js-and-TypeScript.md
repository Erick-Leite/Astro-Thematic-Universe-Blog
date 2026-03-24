---
title: "Headless Component Architecture: O Guia Definitivo com Vue.js e TypeScript"
description: "Aprenda a separar comportamento de apresentação com Headless Components em Vue.js e TypeScript. Construa componentes reutilizáveis como Toggle, Dropdown e Pagination com lógica encapsulada, acessibilidade embutida e liberdade total de design — seguindo a mesma arquitetura usada por Headless UI, Radix e Reka UI."
category: "Programação"
authorsNames: ["Gerado por IA"]
heroImage: "@assets/blog/Arquitetura-de-Componentes-Headless-Vuejs-TypeScript.jpg"
heroImageAlt: "Ilustração técnica em fundo escuro com o título 'ARQUITETURA DE COMPONENTES HEADLESS' e subtítulo 'O Guia Definitivo com Vue.js e TypeScript'. No centro, um motor de carro futurista, transparente e com circuitos verde-neon levita, exibindo a placa 'HeadlessToggle.vue'. Atrás dele, há um painel translúcido com código Vue e TypeScript. Do motor, saem três cabos luminosos que alimentam diferentes componentes de interface ao seu redor: um interruptor (toggle) inativo à esquerda, um botão com ícone de lua no topo direito, e um botão de coração na base direita. A imagem ilustra uma lógica central alimentando múltiplos visuais."
pubDate: "Marc 23 2026"
---

> **Pré-requisito:** Este artigo pressupõe que você já possui conhecimento básico, intermediário ou avançado em **Vue.js 3.5+** com **TypeScript 5.8+** e está familiarizado com **Single File Components (SFCs)**. Se você sabe o que são `ref`, `computed`, `slots`, `composables` e `props`, você está pronto para seguir em frente.

---

<details>
<summary class="text-4xl">Abra o capô: explore os tópicos deste guia headless</summary>

- [A dor que você já sentiu (mas talvez não saiba nomear)](#a-dor-que-você-já-sentiu-mas-talvez-não-saiba-nomear)
- [O que é, afinal, um "Componente Headless"?](#o-que-é-afinal-um-componente-headless)
- [A anatomia de um Headless Component](#a-anatomia-de-um-headless-component)
  - [Demonstração real dos Headless Components em funcionamento](#demonstração-real-dos-headless-components-em-funcionamento)
  - [Exemplo 1 — O mais simples possível: HeadlessToggle](#exemplo-1--o-mais-simples-possível-headlesstoggle)
  - [Exemplo 2 — Complexidade real: HeadlessDropdown](#exemplo-2--complexidade-real-headlessdropdown)
  - [Exemplo 3 — Composable + Headless: a dupla imbatível](#exemplo-3--composable--headless-a-dupla-imbatível)
- [Headless vs. Composable: quando usar cada um?](#headless-vs-composable-quando-usar-cada-um)
- [As regras de ouro de um bom Headless Component](#as-regras-de-ouro-de-um-bom-headless-component)
- [Design Systems que adotam a Headless Component Architecture](#design-systems-que-adotam-a-headless-component-architecture)
- [Conclusão: separar o "o quê" do "como parece"](#conclusão-separar-o-o-quê-do-como-parece)

</details>

## A dor que você já sentiu (mas talvez não saiba nomear)

Você já construiu um componente `<Select>` bonito, funcional, com animações, acessibilidade e testes. Duas sprints depois, o designer aparece com uma versão completamente diferente visualmente — mas com **o mesmo comportamento**. O que você faz? Copia o componente, muda o template, duplica lógica? Cria uma prop `variant` que vira um monstro de `v-if`?

Se isso doeu, é porque você está pronto para entender a **Headless Component Architecture**.

---

## O que é, afinal, um "Componente Headless"?

O nome é literal: um componente **sem cabeça** — ou seja, **sem interface gráfica**. Ele encapsula **comportamento, estado e lógica de interação**, mas delega **100% da renderização** para quem o consome.

Pense assim: um componente headless é como um **motor de carro vendido separadamente**. Ele fornece potência, controle de rotação, injeção de combustível. Mas a carroceria — se será um sedã, um SUV ou um carro de corrida — é decisão sua.

Na prática, um componente headless expõe sua funcionalidade através de **scoped slots** (ou, em cenários mais avançados, **render functions**), permitindo que o consumidor controle completamente a camada visual enquanto reusa toda a lógica interna.

---

## A anatomia de um Headless Component

Para entender a arquitetura de verdade, vamos construir algo real — passo a passo — e com complexidade crescente.

### Demonstração real dos Headless Components em funcionamento

[Neste link](https://github.com/Erick-Leite/Demonstration-links-of-the-article-Headless-Component-Architecture/blob/main/README.md), você pode conferir todos os exemplos de Headless Components mostrados abaixo em funcionamento dentro do playground oficial do Vue.js, onde também é possível editar o código original e conferir o resultado das alterações — tudo isso diretamente no seu navegador.

Observação: os caminhos de importação estão diferentes devido a uma adaptação usada dentro do playground.

### Exemplo 1 — O mais simples possível: `HeadlessToggle`

Vamos começar com um toggle (alternador booleano). Parece trivial, mas é perfeito para isolar o conceito.

**O componente headless — `HeadlessToggle.vue`:**

```vue
<script setup lang="ts">
import { ref } from "vue";

export interface ToggleSlotProps {
  isActive: boolean;
  toggle: () => void;
  activate: () => void;
  deactivate: () => void;
}

const isActive = ref<boolean>(false);

const toggle = (): void => {
  isActive.value = !isActive.value;
};

const activate = (): void => {
  isActive.value = true;
};

const deactivate = (): void => {
  isActive.value = false;
};
</script>

<template>
  <slot
    :is-active="isActive"
    :toggle="toggle"
    :activate="activate"
    :deactivate="deactivate"
  />
</template>
```

Repare: **não há nenhum elemento visual**. Nenhum `<div>`, nenhum `<button>`, nenhuma classe CSS. O `<template>` contém apenas um `<slot>` que expõe estado e ações.

**Consumindo o `HeadlessToggle` — versão "switch" estilizado:**

```vue
<script setup lang="ts">
import HeadlessToggle from "@/components/HeadlessToggle.vue";
</script>

<template>
  <HeadlessToggle v-slot="{ isActive, toggle }">
    <button
      type="button"
      role="switch"
      :aria-checked="isActive"
      class="switch"
      :class="{ 'switch--active': isActive }"
      @click="toggle"
    >
      <span class="switch__thumb" />
    </button>
  </HeadlessToggle>
</template>

<style scoped>
.switch {
  aspect-ratio: 2/1;
  width: 3rem;
  border-radius: 9999px;
  background-color: #d1d5db;
  position: relative;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.switch--active {
  background-color: #10b981;
}

.switch__thumb {
  aspect-ratio: 1/1;
  width: 1.25rem;
  border-radius: 50%;
  background-color: #ffffff;
  position: absolute;
  top: 50%;
  left: 2px;
  transform: translateY(-50%);
  transition: left 0.2s ease;
}

.switch--active .switch__thumb {
  left: calc(100% - 1.25rem - 2px);
}
</style>
```

**Consumindo o mesmo `HeadlessToggle` — versão "ícone de favorito":**

```vue
<script setup lang="ts">
import HeadlessToggle from "@/components/HeadlessToggle.vue";
</script>

<template>
  <HeadlessToggle v-slot="{ isActive, toggle }">
    <button
      type="button"
      :aria-label="
        isActive ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
      "
      class="favorite-btn"
      @click="toggle"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        :fill="isActive ? '#ef4444' : 'none'"
        :stroke="isActive ? '#ef4444' : '#9ca3af'"
        stroke-width="2"
        width="32"
        height="32"
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2
          8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81
          4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58
          3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55
          11.54L12 21.35z"
        />
      </svg>
    </button>
  </HeadlessToggle>
</template>

<style scoped>
.favorite-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  transition: transform 0.15s ease;
}

.favorite-btn:active {
  transform: scale(0.85);
}
</style>
```

**Mesmo componente. Mesma lógica. Duas interfaces completamente diferentes.** Esse é o coração da Headless Component Architecture.

---

### Exemplo 2 — Complexidade real: `HeadlessDropdown`

Um toggle é didático, mas a arquitetura brilha quando a lógica é complexa. Dropdowns envolvem estado aberto/fechado, navegação por teclado, foco, fechamento ao clicar fora e acessibilidade. Ninguém quer reescrever isso toda vez que o design muda.

**O componente headless — `HeadlessDropdown.vue`:**

```vue
<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  type ComponentPublicInstance,
} from "vue";

export interface DropdownOption<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
}

export interface DropdownSlotProps<T = string> {
  isOpen: boolean;
  selectedOption: DropdownOption<T> | null;
  highlightedIndex: number;
  options: DropdownOption<T>[];
  open: () => void;
  close: () => void;
  toggle: () => void;
  select: (option: DropdownOption<T>) => void;
  setTriggerRef: (el: Element | ComponentPublicInstance | null) => void;
  setListRef: (el: Element | ComponentPublicInstance | null) => void;
  setHighlightedIndex: (index: number) => void;
  getOptionId: (index: number) => string;
  activeDescendantId: string | undefined;
  handleKeydown: (event: KeyboardEvent) => void;
}

const props = defineProps<{
  options: DropdownOption[];
  modelValue?: DropdownOption | null;
}>();

const emit = defineEmits<{
  "update:modelValue": [option: DropdownOption];
}>();

const uid = `hdd-${Math.random().toString(36).slice(2, 9)}`;

const isOpen = ref<boolean>(false);
const highlightedIndex = ref<number>(-1);
const triggerRef = ref<HTMLElement | null>(null);
const listRef = ref<HTMLElement | null>(null);

const selectedOption = computed<DropdownOption | null>(
  () => props.modelValue ?? null,
);

const enabledOptions = computed<DropdownOption[]>(() =>
  props.options.filter((opt) => !opt.disabled),
);

const getOptionId = (index: number): string => `${uid}-option-${index}`;

const activeDescendantId = computed<string | undefined>(() =>
  highlightedIndex.value >= 0 ? getOptionId(highlightedIndex.value) : undefined,
);

function setTriggerRef(el: Element | ComponentPublicInstance | null): void {
  triggerRef.value = el as HTMLElement | null;
}

function setListRef(el: Element | ComponentPublicInstance | null): void {
  listRef.value = el as HTMLElement | null;
}

function setHighlightedIndex(index: number): void {
  highlightedIndex.value = index;
}

function open(): void {
  if (isOpen.value) return;
  isOpen.value = true;
  highlightedIndex.value = props.options.findIndex(
    (opt) => !opt.disabled && opt.value === selectedOption.value?.value,
  );
}

function close(): void {
  if (!isOpen.value) return;
  isOpen.value = false;
  highlightedIndex.value = -1;
  triggerRef.value?.focus();
}

function toggle(): void {
  isOpen.value ? close() : open();
}

function select(option: DropdownOption): void {
  if (option.disabled) return;
  emit("update:modelValue", option);
  close();
}

function handleKeydown(event: KeyboardEvent): void {
  if (
    !isOpen.value &&
    ["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)
  ) {
    event.preventDefault();
    open();
    return;
  }

  if (!isOpen.value) return;

  switch (event.key) {
    case "ArrowDown": {
      event.preventDefault();
      let next = highlightedIndex.value;
      do {
        next = (next + 1) % props.options.length;
      } while (
        props.options[next]?.disabled &&
        next !== highlightedIndex.value
      );
      highlightedIndex.value = next;
      break;
    }
    case "ArrowUp": {
      event.preventDefault();
      let prev = highlightedIndex.value;
      do {
        prev = (prev - 1 + props.options.length) % props.options.length;
      } while (
        props.options[prev]?.disabled &&
        prev !== highlightedIndex.value
      );
      highlightedIndex.value = prev;
      break;
    }
    case "Enter":
    case " ": {
      event.preventDefault();
      if (highlightedIndex.value >= 0) {
        select(props.options[highlightedIndex.value]);
      }
      break;
    }
    case "Escape": {
      event.preventDefault();
      close();
      break;
    }
    case "Home": {
      event.preventDefault();
      highlightedIndex.value = enabledOptions.value.length
        ? props.options.indexOf(enabledOptions.value[0])
        : 0;
      break;
    }
    case "End": {
      event.preventDefault();
      highlightedIndex.value = enabledOptions.value.length
        ? props.options.indexOf(
            enabledOptions.value[enabledOptions.value.length - 1],
          )
        : props.options.length - 1;
      break;
    }
  }
}

function handleClickOutside(event: MouseEvent): void {
  const target = event.target as Node;
  if (!triggerRef.value?.contains(target) && !listRef.value?.contains(target)) {
    close();
  }
}

onMounted(() => {
  document.addEventListener("mousedown", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});
</script>

<template>
  <slot
    :is-open="isOpen"
    :selected-option="selectedOption"
    :highlighted-index="highlightedIndex"
    :options="props.options"
    :open="open"
    :close="close"
    :toggle="toggle"
    :select="select"
    :set-trigger-ref="setTriggerRef"
    :set-list-ref="setListRef"
    :set-highlighted-index="setHighlightedIndex"
    :get-option-id="getOptionId"
    :active-descendant-id="activeDescendantId"
    :handle-keydown="handleKeydown"
  />
</template>
```

São **centenas de linhas** de lógica pura: gerenciamento de estado, navegação por teclado (`ArrowUp`, `ArrowDown`, `Home`, `End`, `Escape`), fechamento ao clicar fora, IDs acessíveis para `aria-activedescendant`, e gerenciamento de refs. Tudo isso **escrito uma única vez**.

**Consumindo — dropdown minimalista:**

```vue
<script setup lang="ts">
import { ref } from "vue";
import HeadlessDropdown, {
  type DropdownOption,
} from "@/components/HeadlessDropdown.vue";

const options: DropdownOption[] = [
  { value: "vue", label: "Vue.js" },
  { value: "react", label: "React" },
  { value: "angular", label: "Angular", disabled: true },
  { value: "svelte", label: "Svelte" },
];

const selected = ref<DropdownOption | null>(null);
</script>

<template>
  <HeadlessDropdown
    :options="options"
    :model-value="selected"
    @update:model-value="selected = $event"
    v-slot="{
      isOpen,
      selectedOption,
      highlightedIndex,
      options: opts,
      toggle,
      select,
      setTriggerRef,
      setListRef,
      setHighlightedIndex,
      getOptionId,
      activeDescendantId,
      handleKeydown,
    }"
  >
    <div class="dropdown" @keydown="handleKeydown">
      <button
        :ref="setTriggerRef"
        type="button"
        class="dropdown__trigger"
        role="combobox"
        aria-haspopup="listbox"
        :aria-expanded="isOpen"
        :aria-activedescendant="activeDescendantId"
        @click="toggle"
      >
        {{ selectedOption?.label ?? "Escolha um framework" }}
        <span
          class="dropdown__arrow"
          :class="{ 'dropdown__arrow--open': isOpen }"
        >
          ▾
        </span>
      </button>

      <Transition name="dropdown-fade">
        <ul
          v-if="isOpen"
          :ref="setListRef"
          role="listbox"
          class="dropdown__list"
        >
          <li
            v-for="(option, index) in opts"
            :key="option.value"
            :id="getOptionId(index)"
            role="option"
            :aria-selected="selectedOption?.value === option.value"
            :aria-disabled="option.disabled ?? false"
            class="dropdown__option"
            :class="{
              'dropdown__option--highlighted': highlightedIndex === index,
              'dropdown__option--selected':
                selectedOption?.value === option.value,
              'dropdown__option--disabled': option.disabled,
            }"
            @click="select(option)"
            @pointerenter="setHighlightedIndex(index)"
          >
            {{ option.label }}
          </li>
        </ul>
      </Transition>
    </div>
  </HeadlessDropdown>
</template>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
  font-family: "Inter", system-ui, sans-serif;
}

.dropdown__trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background-color: #ffffff;
  cursor: pointer;
  transition: border-color 0.15s ease;
}

.dropdown__trigger:focus-visible {
  outline: 2px solid #6366f1;
  outline-offset: 2px;
}

.dropdown__arrow {
  transition: transform 0.2s ease;
}

.dropdown__arrow--open {
  transform: rotate(180deg);
}

.dropdown__list {
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 0;
  min-width: 100%;
  margin: 0;
  padding: 0.25rem 0;
  list-style: none;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  z-index: 50;
}

.dropdown__option {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.1s ease;
}

.dropdown__option--highlighted {
  background-color: #eef2ff;
}

.dropdown__option--selected {
  font-weight: 600;
  color: #4f46e5;
}

.dropdown__option--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
```

Se amanhã o design mudar para um dropdown com avatares, ícones, badges de status ou uma estética completamente diferente, você cria **outro consumidor** com outro `<template>` e outro `<style>`. A lógica de teclado, foco, acessibilidade e estado? Permanece intocada dentro do `HeadlessDropdown.vue`.

---

### Exemplo 3 — Composable + Headless: a dupla imbatível

Em cenários ainda mais complexos, pode ser vantajoso extrair a lógica para um **composable** e usá-lo dentro de um componente headless. Isso oferece dois pontos de consumo: quem prefere slots usa o componente; quem prefere a Composition API usa o composable diretamente.

**O composable — `usePagination.ts`:**

```typescript
import { ref, computed, type Ref, type ComputedRef } from "vue";

export interface UsePaginationOptions {
  totalItems: Ref<number> | ComputedRef<number>;
  itemsPerPage?: Ref<number> | ComputedRef<number>;
  initialPage?: number;
}

export interface UsePaginationReturn {
  currentPage: Ref<number>;
  totalPages: ComputedRef<number>;
  isFirstPage: ComputedRef<boolean>;
  isLastPage: ComputedRef<boolean>;
  pages: ComputedRef<number[]>;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  startIndex: ComputedRef<number>;
  endIndex: ComputedRef<number>;
}

export function usePagination(
  options: UsePaginationOptions,
): UsePaginationReturn {
  const { totalItems, itemsPerPage = ref(10), initialPage = 1 } = options;

  const currentPage = ref<number>(initialPage);

  const totalPages = computed<number>(() =>
    Math.max(1, Math.ceil(totalItems.value / itemsPerPage.value)),
  );

  const isFirstPage = computed<boolean>(() => currentPage.value === 1);
  const isLastPage = computed<boolean>(
    () => currentPage.value === totalPages.value,
  );

  const pages = computed<number[]>(() => {
    const total = totalPages.value;
    const current = currentPage.value;
    const delta = 2;
    const range: number[] = [];

    const from = Math.max(2, current - delta);
    const to = Math.min(total - 1, current + delta);

    range.push(1);

    if (from > 2) range.push(-1); // elipsis marker

    for (let i = from; i <= to; i++) {
      range.push(i);
    }

    if (to < total - 1) range.push(-1); // elipsis marker

    if (total > 1) range.push(total);

    return range;
  });

  const startIndex = computed<number>(
    () => (currentPage.value - 1) * itemsPerPage.value,
  );

  const endIndex = computed<number>(() =>
    Math.min(startIndex.value + itemsPerPage.value, totalItems.value),
  );

  function goToPage(page: number): void {
    const clamped = Math.min(Math.max(1, page), totalPages.value);
    currentPage.value = clamped;
  }

  function nextPage(): void {
    if (!isLastPage.value) goToPage(currentPage.value + 1);
  }

  function prevPage(): void {
    if (!isFirstPage.value) goToPage(currentPage.value - 1);
  }

  return {
    currentPage,
    totalPages,
    isFirstPage,
    isLastPage,
    pages,
    goToPage,
    nextPage,
    prevPage,
    startIndex,
    endIndex,
  };
}
```

**O componente headless que encapsula o composable — `HeadlessPagination.vue`:**

```vue
<script setup lang="ts">
import { toRef, reactive } from "vue";
import { usePagination } from "@/composables/usePagination";

const props = defineProps<{
  totalItems: number;
  itemsPerPage?: number;
}>();

const pagination = reactive(
  usePagination({
    totalItems: toRef(() => props.totalItems),
    itemsPerPage: toRef(() => props.itemsPerPage ?? 10),
  }),
);
</script>

<template>
  <slot v-bind="pagination" />
</template>
```

Simples assim. O componente headless vira um **adaptador fino** que transforma props em refs e expõe tudo via slot.

**Consumindo — paginação estilizada:**

```vue
<script setup lang="ts">
import HeadlessPagination from "@/components/HeadlessPagination.vue";
</script>

<template>
  <HeadlessPagination
    :total-items="237"
    :items-per-page="15"
    v-slot="{
      currentPage,
      totalPages,
      isFirstPage,
      isLastPage,
      pages,
      goToPage,
      nextPage,
      prevPage,
    }"
  >
    <nav aria-label="Paginação" class="pagination">
      <button class="pagination__btn" :disabled="isFirstPage" @click="prevPage">
        ← Anterior
      </button>

      <template v-for="(page, index) in pages" :key="index">
        <span v-if="page === -1" class="pagination__ellipsis">…</span>
        <button
          v-else
          class="pagination__btn"
          :class="{ 'pagination__btn--active': page === currentPage }"
          :aria-current="page === currentPage ? 'page' : undefined"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </template>

      <button class="pagination__btn" :disabled="isLastPage" @click="nextPage">
        Próximo →
      </button>

      <span class="pagination__info">
        Página {{ currentPage }} de {{ totalPages }}
      </span>
    </nav>
  </HeadlessPagination>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-family: "Inter", system-ui, sans-serif;
  font-size: 0.875rem;
}

.pagination__btn {
  padding: 0.375rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.15s ease;
}

.pagination__btn:hover:not(:disabled) {
  background-color: #f3f4f6;
}

.pagination__btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination__btn--active {
  background-color: #4f46e5;
  color: #ffffff;
  border-color: #4f46e5;
}

.pagination__ellipsis {
  padding: 0.375rem 0.5rem;
  color: #9ca3af;
}

.pagination__info {
  margin-left: auto;
  color: #6b7280;
}
</style>
```

---

## Headless vs. Composable: quando usar cada um?

Neste ponto, talvez você esteja pensando: "Se posso extrair tudo para um composable, por que manter o componente headless?" Boa pergunta. A resposta está no **contexto de uso e ergonomia**.

O **composable puro** (`usePagination`, `useToggle`, etc.) é ideal quando o consumidor precisa de controle total sobre o ciclo de vida, quer compor múltiplos composables em um único componente, ou precisa da lógica fora de um template. É a abordagem mais flexível.

O **componente headless** é ideal quando você quer oferecer uma API declarativa via template, que fique natural no ecossistema Vue de slots e props. Equipes que trabalham com designers ou desenvolvedores menos experientes na Composition API frequentemente preferem consumir lógica via `v-slot` do que importar e conectar composables manualmente.

A abordagem mais robusta — como vimos no Exemplo 3 — é oferecer **ambos**: o composable como primitiva de baixo nível e o componente headless como conveniência de alto nível. Quem precisa de mais controle usa o composable; quem quer praticidade usa o componente.

---

## As regras de ouro de um bom Headless Component

Ao projetar seus próprios componentes headless, mantenha estes princípios em mente.

**Primeiro: zero markup opinativo.** O componente headless não deve renderizar nenhum elemento HTML próprio além do `<slot>`. No momento em que você adiciona um `<div>` wrapper, está impondo estrutura ao consumidor.

**Segundo: expor estado derivado, não apenas bruto.** Não exponha apenas `currentPage` — exponha também `isFirstPage`, `isLastPage`, `totalPages`. Isso evita que cada consumidor recalcule as mesmas coisas.

**Terceiro: tipagem rigorosa dos slot props.** Exporte sempre a interface dos slot props. Isso permite que o consumidor importe o tipo e tenha autocomplete completo no template (especialmente com Volar/vue-tsc).

**Quarto: acessibilidade embutida onde possível.** Exponha IDs gerados, `aria-activedescendant`, roles e handlers de teclado. O consumidor pode ignorá-los, mas eles devem estar disponíveis.

**Quinto: eventos como saída, props como entrada.** O headless component segue o mesmo contrato de qualquer componente Vue — recebe dados via props, emite mudanças via eventos. O `v-model` funciona normalmente.

---

## Design Systems que adotam a Headless Component Architecture

Esta arquitetura não é um conceito acadêmico. Ela está no núcleo de alguns dos design systems mais influentes do ecossistema frontend.

**Headless UI** (pela equipe do Tailwind Labs) é provavelmente o exemplo mais direto. Disponível para React e Vue, ele fornece componentes como Dialog, Listbox, Combobox, Switch, Tabs e Menu — todos completamente sem estilo. A motivação é explícita: permitir que equipes usem Tailwind CSS (ou qualquer outra abordagem de estilização) sem lutar contra estilos pré-definidos, enquanto ganham toda a lógica de acessibilidade e interação de graça.

**Radix UI** (focado em React, mas extremamente influente no conceito) segue a mesma filosofia. Cada "primitive" do Radix é um componente headless que implementa as WAI-ARIA Design Patterns com rigor. A equipe do Radix defende que acessibilidade é complexa demais para ser reimplementada por cada equipe, e que separar lógica de apresentação é a única forma de garantir conformidade sem sacrificar liberdade visual.

**Ark UI** (pelo time do Chakra UI / Zag.js) é outra referência. Construído sobre máquinas de estado finito (via Zag.js), ele oferece componentes headless para Vue, React e Solid. O uso de state machines como backend lógico para componentes headless é uma evolução interessante da arquitetura — a lógica se torna não apenas reutilizável, mas formalmente verificável.

**Reka UI** (anteriormente Radix Vue) traz os primitivos do Radix para o ecossistema Vue. Cada componente é não-estilizado por padrão e expõe slots e props tipados para controle total do template. É a prova de que a comunidade Vue adota a arquitetura headless com o mesmo entusiasmo.

**Melt UI** (para Svelte) e **Kobalte** (para SolidJS) seguem padrões idênticos em seus respectivos ecossistemas, mostrando que essa arquitetura transcende frameworks.

O motivo comum a todos é o mesmo: **lógica de interação e acessibilidade é difícil, custosa e propensa a erros**. Encapsulá-la em componentes headless permite que seja testada, auditada e mantida em um único lugar, enquanto a apresentação visual permanece completamente livre para se adaptar a qualquer marca, tema ou contexto de uso.

---

## Conclusão: separar o "o quê" do "como parece"

A Headless Component Architecture não é uma tendência passageira — é uma consequência natural da maturidade do desenvolvimento de interfaces. Quando você separa **comportamento** de **apresentação**, ganha reuso genuíno, testabilidade isolada, acessibilidade consistente e liberdade total de design.

Com Vue 3.5+, TypeScript 5.8+ e SFCs, você tem todas as ferramentas necessárias: scoped slots tipados, composables, generics em componentes, e uma DX que torna a arquitetura não apenas viável, mas prazerosa de implementar.

Da próxima vez que você se pegar copiando um componente para mudar só o visual, pare. Extraia a cabeça. Deixe o corpo livre.

---

_Se este artigo foi útil, considere aplicar essa arquitetura em um único componente do seu projeto atual — um toggle, um dropdown, um accordion. Comece pequeno. A mudança de mentalidade é mais valiosa que qualquer refatoração em massa._
