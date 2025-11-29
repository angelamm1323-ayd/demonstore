<script>
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";

    let products = [];
    let categories = [];
    let selectedCategory = "all";
    let searchTerm = "";
    let loading = true;

    onMount(async () => {
        try {
            const { collection, getDocs } = await import("firebase/firestore");
            const { db } = await import("$lib/js/firebase.js");

            const [productsSnap, categoriesSnap] = await Promise.all([
                getDocs(collection(db, "products")),
                getDocs(collection(db, "categorias")),
            ]);

            products = productsSnap.docs.map((doc) => ({
                docId: doc.id,
                ...doc.data(),
            }));

            categories = categoriesSnap.docs.map((doc) => ({
                docId: doc.id,
                ...doc.data(),
            }));

            loading = false;
        } catch (error) {
            console.error("Error loading data:", error);
            loading = false;
        }
    });

    $: filteredProducts = products.filter((product) => {
        const matchesCategory =
            selectedCategory === "all" ||
            product.categoryId === selectedCategory;
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const formatCurrency = (n) =>
        new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
        }).format(n);

    const imgSrc = (p) => (p?.image?.trim() ? p.image : "/imagenotfound.jpg");
</script>

<main class="min-h-screen bg-linear-to-br from-gray-900 to-black text-white">
    <!-- Hero Section -->
    <section class="relative py-20 overflow-hidden">
        <div class="absolute inset-0 z-0">
            <div
                class="absolute top-1/4 -left-20 w-96 h-96 bg-red-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
            ></div>
            <div
                class="absolute top-1/2 -right-20 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
            ></div>
        </div>

        <div class="relative z-10 container mx-auto px-4 text-center">
            <h1
                class="text-5xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-linear-to-r from-white to-red-400"
            >
                Nuestro Catálogo
            </h1>
            <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Descubre nuestra exclusiva colección de prendas seleccionadas
                con estilo
            </p>

            <!-- Search Bar -->
            <div class="max-w-2xl mx-auto">
                <div class="relative">
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        bind:value={searchTerm}
                        class="w-full px-6 py-4 rounded-full bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-red-500 pl-12"
                    />
                    <i
                        class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    ></i>
                </div>
            </div>
        </div>
    </section>

    <!-- Filters Section -->
    <section class="container mx-auto px-4 py-8">
        <div class="flex flex-wrap gap-3 justify-center">
            <button
                class="px-6 py-2 rounded-full border-2 transition-all {selectedCategory ===
                'all'
                    ? 'bg-red-600 border-red-600 text-white'
                    : 'border-gray-700 text-gray-300 hover:border-red-600'}"
                on:click={() => (selectedCategory = "all")}
            >
                Todos ({products.length})
            </button>
            {#each categories as category}
                <button
                    class="px-6 py-2 rounded-full border-2 transition-all {selectedCategory ===
                    category.docId
                        ? 'bg-red-600 border-red-600 text-white'
                        : 'border-gray-700 text-gray-300 hover:border-red-600'}"
                    on:click={() => (selectedCategory = category.docId)}
                >
                    {category.nombre}
                    ({products.filter((p) => p.categoryId === category.docId)
                        .length})
                </button>
            {/each}
        </div>
    </section>

    <!-- Products Grid -->
    <section class="container mx-auto px-4 py-12 pb-20">
        {#if loading}
            <div class="flex justify-center items-center h-64">
                <div
                    class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"
                ></div>
            </div>
        {:else if filteredProducts.length === 0}
            <div class="text-center py-20">
                <i class="fas fa-box-open text-6xl text-gray-600 mb-4"></i>
                <h3 class="text-2xl font-bold mb-2">
                    No hay productos disponibles
                </h3>
                <p class="text-gray-400">
                    Intenta con otra búsqueda o categoría
                </p>
            </div>
        {:else}
            <div
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
                {#each filteredProducts as product, i (product.docId)}
                    <article
                        class="group relative bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl hover:shadow-red-500/20 transition-all duration-500 hover:-translate-y-2"
                        in:fly={{
                            y: 50,
                            duration: 500,
                            delay: i * 50,
                            easing: quintOut,
                        }}
                    >
                        <div class="relative overflow-hidden">
                            <img
                                src={imgSrc(product)}
                                alt={product.name}
                                class="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                                on:error={(e) =>
                                    (e.target.src = "/imagenotfound.jpg")}
                            />
                            <div
                                class="absolute inset-0 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            ></div>

                            {#if product.stock <= 5}
                                <div
                                    class="absolute top-3 right-3 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold"
                                >
                                    ¡Últimas unidades!
                                </div>
                            {/if}
                        </div>

                        <div class="p-6">
                            <h3
                                class="text-xl font-bold mb-2 text-white group-hover:text-red-400 transition-colors"
                            >
                                {product.name}
                            </h3>

                            {#if product.description}
                                <p
                                    class="text-sm text-gray-400 mb-4 line-clamp-2"
                                >
                                    {product.description}
                                </p>
                            {/if}

                            <div class="flex items-center justify-between mb-4">
                                <div>
                                    <p class="text-xs text-gray-500">Precio</p>
                                    <p class="text-2xl font-bold text-red-400">
                                        {formatCurrency(product.valorVenta)}
                                    </p>
                                </div>
                                <div class="text-right">
                                    <p class="text-xs text-gray-500">Stock</p>
                                    <p class="text-lg font-semibold text-white">
                                        {product.stock}
                                    </p>
                                </div>
                            </div>

                            <a
                                href="https://wa.me/573189746650?text=Hola! Me interesa el producto: {product.name}"
                                class="block w-full bg-linear-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white py-3 px-6 rounded-full font-medium transition-all duration-300 transform hover:scale-[1.03] active:scale-95 text-center"
                            >
                                <i class="fab fa-whatsapp mr-2"></i>
                                Consultar
                            </a>
                        </div>
                    </article>
                {/each}
            </div>
        {/if}
    </section>
</main>

<style>
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }

    @keyframes blob {
        0%,
        100% {
            transform: translate(0, 0) scale(1);
        }
        33% {
            transform: translate(30px, -50px) scale(1.1);
        }
        66% {
            transform: translate(-20px, 20px) scale(0.9);
        }
    }

    .animate-blob {
        animation: blob 7s infinite;
    }

    .animation-delay-2000 {
        animation-delay: 2s;
    }
</style>
