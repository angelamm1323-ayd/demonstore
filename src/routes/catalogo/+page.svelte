<script>
    import { onMount } from "svelte";

    // Importar componentes
    import Hero from "./components/Hero.svelte";
    import CategoryFilters from "./components/CategoryFilters.svelte";
    import ProductsGrid from "./components/ProductsGrid.svelte";

    // Estado de la aplicación
    let products = [];
    let categories = [];
    let selectedCategory = "all";
    let searchTerm = "";
    let loading = true;

    // Cargar datos de Firestore
    onMount(async () => {
        try {
            const { collection, getDocs } = await import("firebase/firestore");
            const { db } = await import("$lib/js/firebase.js");

            const [productsSnap, categoriesSnap] = await Promise.all([
                getDocs(collection(db, "products")),
                getDocs(collection(db, "categorias")),
            ]);

            // First load categories into a map for easy lookup
            const categoriesMap = {};
            categoriesSnap.docs.forEach((doc) => {
                categoriesMap[doc.id] = doc.data();
            });

            // Then map products and include category data
            products = productsSnap.docs.map((doc) => {
                const productData = doc.data();
                const categoryData = productData.categoryId
                    ? categoriesMap[productData.categoryId]
                    : null;

                return {
                    docId: doc.id,
                    ...productData,
                    category: categoryData
                        ? categoryData.nombre
                        : "Sin categoría",
                };
            });

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

    // Filtrar productos según búsqueda y categoría
    $: filteredProducts = products.filter((product) => {
        const matchesCategory =
            selectedCategory === "all" ||
            product.categoryId === selectedCategory;
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });
</script>

<main class="min-h-screen bg-linear-to-br from-gray-900 to-black text-white">
    <!-- Componente Hero con barra de búsqueda -->
    <Hero bind:searchTerm />

    <!-- Componente de Filtros de Categoría -->
    <CategoryFilters {categories} {products} bind:selectedCategory />

    <!-- Componente de Cuadrícula de Productos -->
    <ProductsGrid {filteredProducts} {loading} />
</main>
