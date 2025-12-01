<script>
    import { fade } from "svelte/transition";
    import { createEventDispatcher } from "svelte";

    export let isOpen = false;
    export let product = null;

    const dispatch = createEventDispatcher();
    const close = () => dispatch("close");

    const formatPrice = (price) =>
        new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
        }).format(price);
</script>

{#if isOpen}
    <div
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 p-4 overflow-y-auto"
        on:click|self={close}
        on:keydown={(e) => e.key === "Escape" && close()}
        transition:fade
        role="dialog"
        aria-modal="true"
        tabindex="0"
    >
        <div
            class="mx-auto bg-gray-900 shadow-2xl max-w-4xl w-full animate-fade-up relative rounded-xl overflow-hidden md:py-6 md:px-4"
        >
            <div class="grid grid-cols-1 md:grid-cols-2">
                <!-- IMAGEN -->
                <div
                    class="relative h-72 md:h-full w-full overflow-hidden md:rounded-xl bg-black"
                >
                    <img
                        src={product?.image || "/imagenotfound.jpg"}
                        alt={product?.name}
                        class="w-full h-full object-cover"
                        on:error={(e) => (e.target.src = "/imagenotfound.jpg")}
                    />

                    <!-- BOTÓN CERRAR - igual estilo que la tienda anterior -->
                    <button
                        on:click={close}
                        aria-label="Cerrar"
                        class="absolute top-4 right-4 bg-white/60 text-red-700 w-10 h-10 rounded-full
                            flex items-center justify-center text-xl shadow hover:bg-white transition cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                <!-- CONTENIDO -->
                <div class="flex flex-col h-full p-6">
                    <div
                        class="flex flex-col gap-6 overflow-auto grow pr-2 justify-evenly items-start"
                    >
                        <div class="flex flex-col space-y-2">
                            <h1 class="text-4xl font-bold text-red-500">
                                {product?.name}
                            </h1>

                            {#if product?.description}
                                <p
                                    class="text-gray-300 text-md leading-relaxed"
                                >
                                    {product.description}
                                </p>
                            {/if}
                        </div>

                        <!-- TALLAS TIPO TOP -->
                        {#if product?.sizes && Object.values(product.sizes).some((v) => v > 0)}
                            <div>
                                <p class="text-md text-gray-200">Tallas</p>
                                <div class="flex gap-2 flex-wrap">
                                    {#each Object.entries(product.sizes) as [talla, cant]}
                                        {#if cant > 0}
                                            <span
                                                class="px-2 py-1 rounded bg-gray-950 text-white text-sm border border-white/20"
                                            >
                                                {talla.toUpperCase()} ({cant})
                                            </span>
                                        {/if}
                                    {/each}
                                </div>
                            </div>
                        {/if}

                        <!-- TALLAS NUMÉRICAS -->
                        {#if product?.clothingType === "bottom" && product?.numericSizes?.length}
                            <div>
                                <p class="text-md text-gray-200">Tallas</p>
                                <div class="flex gap-2 flex-wrap">
                                    {#each product.numericSizes as size}
                                        <span
                                            class="px-2 py-1 rounded bg-gray-950 text-white text-sm border border-white/20"
                                        >
                                            {size.size}
                                        </span>
                                    {/each}
                                </div>
                            </div>
                        {/if}

                        <!-- PRECIO + STOCK -->
                        <div class="grid grid-cols-2 gap-6 w-full">
                            <div>
                                <p class="text-md text-red-500">Precio</p>
                                <p class="text-xl font-semibold text-white">
                                    {formatPrice(product?.valorVenta)}
                                </p>
                            </div>

                            <div class="text-right">
                                <p class="text-md text-red-500">Stock</p>
                                <p class="text-xl font-semibold text-white">
                                    {product?.stock}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- FOOTER -->
                    <div
                        class="grid grid-cols-4 gap-3 mt-auto border-t border-red-900 pt-6"
                    >
                        <a
                            href={`https://wa.me/573189746650?text=Hola! Me interesa el producto: ${product?.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="col-span-3 bg-linear-to-r from-red-600 to-red-700 text-white py-3 rounded-lg
                        font-semibold text-center shadow hover:from-red-500 hover:to-red-600 transition
                        flex items-center justify-center gap-2 hover:scale-[1.01]"
                        >
                            <i class="fab fa-whatsapp text-lg"></i>
                            Consultar por WhatsApp
                        </a>

                        <button
                            class="col-span-1 bg-linear-to-r border border-red-600 text-red-400 py-3 rounded-lg font-semibold shadow
                                hover:from-red-600 hover:to-red-700 hover:text-white transition flex items-center justify-center text-xl hover:scale-[1.06] cursor-pointer"
                            aria-label="Agregar al carrito"
                        >
                            <i class="fa-solid fa-cart-shopping"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    .animate-fade-up {
        animation: fadeUp 0.25s ease-out;
    }

    @keyframes fadeUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
