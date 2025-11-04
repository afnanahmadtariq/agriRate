"use client";

import { useState } from 'react';
import { Search, Filter, ShoppingCart, Plus, Package, TrendingUp, Users, Star } from 'lucide-react';
import ProtectedRoute from '@/app/components/shared/ProtectedRoute';
import DashboardLayout from '@/app/components/shared/DashboardLayout';
import ModernCard from '@/app/components/ModernCard';
import ModernButton from '@/app/components/ModernButton';
import ModernInput from '@/app/components/ModernInput';
import Select from '@/app/components/ui/Select';
import Modal from '@/app/components/ui/Modal';
import { formatCurrency } from '@/app/lib/utils/format';

interface Product {
  id: number;
  name: string;
  category: 'Seeds' | 'Fertilizers' | 'Equipment' | 'Pesticides' | 'Produce';
  seller: string;
  sellerRating: number;
  price: number;
  unit: string;
  stock: number;
  location: string;
  image: string;
  description: string;
  featured: boolean;
}

export default function AgriMartPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<number[]>([]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Seeds' as 'Seeds' | 'Fertilizers' | 'Equipment' | 'Pesticides' | 'Produce',
    price: '',
    unit: 'kg',
    stock: '',
    location: '',
    description: '',
  });

  // Mock products data
  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'Hybrid Wheat Seeds',
      category: 'Seeds',
      seller: 'Green Valley Farms',
      sellerRating: 4.8,
      price: 850,
      unit: 'kg',
      stock: 500,
      location: 'Multan',
      image: '🌾',
      description: 'High-yield hybrid wheat seeds resistant to common diseases',
      featured: true,
    },
    {
      id: 2,
      name: 'NPK Fertilizer 20-20-20',
      category: 'Fertilizers',
      seller: 'Agro Chemicals Ltd',
      sellerRating: 4.5,
      price: 1200,
      unit: '50kg bag',
      stock: 200,
      location: 'Lahore',
      image: '🧪',
      description: 'Balanced NPK fertilizer for all crop types',
      featured: true,
    },
    {
      id: 3,
      name: 'Fresh Tomatoes',
      category: 'Produce',
      seller: 'Organic Valley',
      sellerRating: 4.9,
      price: 45,
      unit: 'kg',
      stock: 1000,
      location: 'Karachi',
      image: '🍅',
      description: 'Fresh organic tomatoes, directly from farm',
      featured: false,
    },
    {
      id: 4,
      name: 'Tractor - Massey Ferguson 240',
      category: 'Equipment',
      seller: 'Farm Equipment Co',
      sellerRating: 4.7,
      price: 850000,
      unit: 'unit',
      stock: 3,
      location: 'Faisalabad',
      image: '🚜',
      description: 'Used tractor in excellent condition, 2020 model',
      featured: true,
    },
    {
      id: 5,
      name: 'Organic Pesticide',
      category: 'Pesticides',
      seller: 'Bio Solutions',
      sellerRating: 4.6,
      price: 450,
      unit: 'liter',
      stock: 150,
      location: 'Islamabad',
      image: '🧴',
      description: 'Eco-friendly pesticide, safe for organic farming',
      featured: false,
    },
    {
      id: 6,
      name: 'Basmati Rice Seeds',
      category: 'Seeds',
      seller: 'Rice Growers Association',
      sellerRating: 4.9,
      price: 1200,
      unit: 'kg',
      stock: 300,
      location: 'Lahore',
      image: '🌾',
      description: 'Premium basmati rice seeds with high germination rate',
      featured: true,
    },
    {
      id: 7,
      name: 'Drip Irrigation System',
      category: 'Equipment',
      seller: 'Irrigation Solutions',
      sellerRating: 4.8,
      price: 25000,
      unit: 'set',
      stock: 20,
      location: 'Multan',
      image: '💧',
      description: 'Complete drip irrigation system for 1 acre',
      featured: false,
    },
    {
      id: 8,
      name: 'Fresh Mangoes',
      category: 'Produce',
      seller: 'Mango Paradise',
      sellerRating: 5.0,
      price: 180,
      unit: 'kg',
      stock: 800,
      location: 'Multan',
      image: '🥭',
      description: 'Premium Sindhri mangoes, directly from orchard',
      featured: true,
    },
  ];

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesLocation = locationFilter === 'all' || product.location === locationFilter;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const featuredProducts = filteredProducts.filter(p => p.featured);
  const regularProducts = filteredProducts.filter(p => !p.featured);

  const stats = {
    totalProducts: mockProducts.length,
    categories: 5,
    sellers: new Set(mockProducts.map(p => p.seller)).size,
    avgRating: 4.7,
  };

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New product:', newProduct);
    setIsAddProductOpen(false);
    setNewProduct({
      name: '',
      category: 'Seeds',
      price: '',
      unit: 'kg',
      stock: '',
      location: '',
      description: '',
    });
  };

  return (
    <ProtectedRoute allowedRoles={['farmer']}>
      <DashboardLayout role="farmer">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-(--color-text) mb-2">
                🛒 AgriMart - Agricultural Marketplace
              </h1>
              <p className="text-(--color-text-secondary)">
                Buy and sell agricultural products, equipment, and produce
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ModernButton variant="secondary" size="md">
                <div className="flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  <span>Cart ({cart.length})</span>
                </div>
              </ModernButton>
              <ModernButton
                variant="primary"
                size="md"
                onClick={() => setIsAddProductOpen(true)}
              >
                <div className="flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  <span>List Product</span>
                </div>
              </ModernButton>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ModernCard>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-(--color-text-secondary) mb-1">Total Products</p>
                  <p className="text-2xl font-bold text-(--color-text)">{stats.totalProducts}</p>
                </div>
                <Package className="w-10 h-10 text-(--color-primary) opacity-20" />
              </div>
            </ModernCard>
            <ModernCard>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-(--color-text-secondary) mb-1">Categories</p>
                  <p className="text-2xl font-bold text-(--color-text)">{stats.categories}</p>
                </div>
                <Filter className="w-10 h-10 text-(--color-success) opacity-20" />
              </div>
            </ModernCard>
            <ModernCard>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-(--color-text-secondary) mb-1">Active Sellers</p>
                  <p className="text-2xl font-bold text-(--color-text)">{stats.sellers}</p>
                </div>
                <Users className="w-10 h-10 text-(--color-info) opacity-20" />
              </div>
            </ModernCard>
            <ModernCard>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-(--color-text-secondary) mb-1">Avg Rating</p>
                  <p className="text-2xl font-bold text-(--color-text)">{stats.avgRating} ⭐</p>
                </div>
                <Star className="w-10 h-10 text-(--color-warning) opacity-20" />
              </div>
            </ModernCard>
          </div>

          {/* Search and Filters */}
          <ModernCard>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <ModernInput
                  id="search"
                  label=""
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search className="w-5 h-5" />}
                />
              </div>
              <Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                options={[
                  { value: 'all', label: 'All Categories' },
                  { value: 'Seeds', label: 'Seeds' },
                  { value: 'Fertilizers', label: 'Fertilizers' },
                  { value: 'Equipment', label: 'Equipment' },
                  { value: 'Pesticides', label: 'Pesticides' },
                  { value: 'Produce', label: 'Produce' },
                ]}
              />
              <Select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                options={[
                  { value: 'all', label: 'All Locations' },
                  { value: 'Multan', label: 'Multan' },
                  { value: 'Lahore', label: 'Lahore' },
                  { value: 'Karachi', label: 'Karachi' },
                  { value: 'Faisalabad', label: 'Faisalabad' },
                  { value: 'Islamabad', label: 'Islamabad' },
                ]}
              />
            </div>
          </ModernCard>

          {/* Featured Products */}
          {featuredProducts.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-6 h-6 text-(--color-primary)" />
                <h2 className="text-2xl font-bold text-(--color-text)">Featured Products</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <ModernCard key={product.id}>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-5xl">{product.image}</span>
                        <span className="px-2 py-1 bg-(--color-warning-light) text-(--color-warning) text-xs font-medium rounded">
                          Featured
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-(--color-text) mb-1">{product.name}</h3>
                        <p className="text-sm text-(--color-text-secondary) line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="px-2 py-1 bg-(--color-info-light) text-(--color-info) rounded text-xs">
                          {product.category}
                        </span>
                        <span className="text-(--color-text-secondary)">📍 {product.location}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-(--color-text-secondary)">{product.seller}</span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-(--color-warning) fill-current" />
                          <span className="font-medium">{product.sellerRating}</span>
                        </span>
                      </div>
                      <div className="pt-2 border-t border-(--color-border)">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="text-2xl font-bold text-(--color-primary)">
                              {formatCurrency(product.price)}
                            </p>
                            <p className="text-xs text-(--color-text-secondary)">per {product.unit}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-(--color-success)">
                              {product.stock} {product.unit}
                            </p>
                            <p className="text-xs text-(--color-text-secondary)">In Stock</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <ModernButton
                            variant="secondary"
                            size="sm"
                            className="flex-1"
                            onClick={() => setSelectedProduct(product)}
                          >
                            View Details
                          </ModernButton>
                          <ModernButton
                            variant="primary"
                            size="sm"
                            className="flex-1"
                            onClick={() => addToCart(product.id)}
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </ModernButton>
                        </div>
                      </div>
                    </div>
                  </ModernCard>
                ))}
              </div>
            </div>
          )}

          {/* All Products */}
          <div>
            <h2 className="text-2xl font-bold text-(--color-text) mb-4">
              All Products ({regularProducts.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {regularProducts.map((product) => (
                <ModernCard key={product.id}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center">
                      <span className="text-5xl">{product.image}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-(--color-text) mb-1">{product.name}</h3>
                      <p className="text-sm text-(--color-text-secondary) line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="px-2 py-1 bg-(--color-info-light) text-(--color-info) rounded text-xs">
                        {product.category}
                      </span>
                      <span className="text-(--color-text-secondary)">📍 {product.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-(--color-text-secondary)">{product.seller}</span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-(--color-warning) fill-current" />
                        <span className="font-medium">{product.sellerRating}</span>
                      </span>
                    </div>
                    <div className="pt-2 border-t border-(--color-border)">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-2xl font-bold text-(--color-primary)">
                            {formatCurrency(product.price)}
                          </p>
                          <p className="text-xs text-(--color-text-secondary)">per {product.unit}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-(--color-success)">
                            {product.stock} {product.unit}
                          </p>
                          <p className="text-xs text-(--color-text-secondary)">In Stock</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <ModernButton
                          variant="secondary"
                          size="sm"
                          className="flex-1"
                          onClick={() => setSelectedProduct(product)}
                        >
                          View Details
                        </ModernButton>
                        <ModernButton
                          variant="primary"
                          size="sm"
                          className="flex-1"
                          onClick={() => addToCart(product.id)}
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </ModernButton>
                      </div>
                    </div>
                  </div>
                </ModernCard>
              ))}
            </div>
          </div>

          {/* Add Product Modal */}
          <Modal
            isOpen={isAddProductOpen}
            onClose={() => setIsAddProductOpen(false)}
            title="List Your Product"
          >
            <form onSubmit={handleAddProduct} className="space-y-4">
              <ModernInput
                id="product-name"
                label="Product Name"
                type="text"
                placeholder="e.g., Hybrid Wheat Seeds"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                required
              />

              <div>
                <label className="block text-sm font-medium text-(--color-text) mb-2">
                  Category
                </label>
                <Select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({
                    ...newProduct,
                    category: e.target.value as 'Seeds' | 'Fertilizers' | 'Equipment' | 'Pesticides' | 'Produce'
                  })}
                  options={[
                    { value: 'Seeds', label: 'Seeds' },
                    { value: 'Fertilizers', label: 'Fertilizers' },
                    { value: 'Equipment', label: 'Equipment' },
                    { value: 'Pesticides', label: 'Pesticides' },
                    { value: 'Produce', label: 'Produce' },
                  ]}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <ModernInput
                  id="price"
                  label="Price (Rs)"
                  type="number"
                  placeholder="850"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-(--color-text) mb-2">
                    Unit
                  </label>
                  <Select
                    value={newProduct.unit}
                    onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                    options={[
                      { value: 'kg', label: 'Kilogram (kg)' },
                      { value: 'liter', label: 'Liter' },
                      { value: 'unit', label: 'Unit' },
                      { value: 'bag', label: 'Bag' },
                      { value: 'dozen', label: 'Dozen' },
                    ]}
                  />
                </div>
              </div>

              <ModernInput
                id="stock"
                label="Available Stock"
                type="number"
                placeholder="500"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                required
              />

              <div>
                <label className="block text-sm font-medium text-(--color-text) mb-2">
                  Location
                </label>
                <Select
                  value={newProduct.location}
                  onChange={(e) => setNewProduct({ ...newProduct, location: e.target.value })}
                  options={[
                    { value: '', label: 'Select Location' },
                    { value: 'Multan', label: 'Multan' },
                    { value: 'Lahore', label: 'Lahore' },
                    { value: 'Karachi', label: 'Karachi' },
                    { value: 'Faisalabad', label: 'Faisalabad' },
                    { value: 'Islamabad', label: 'Islamabad' },
                    { value: 'Rawalpindi', label: 'Rawalpindi' },
                    { value: 'Peshawar', label: 'Peshawar' },
                    { value: 'Quetta', label: 'Quetta' },
                  ]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-(--color-text) mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg border border-(--color-border) bg-(--color-surface) text-(--color-text) focus:outline-none focus:ring-2 focus:ring-(--color-primary) transition-all"
                  rows={3}
                  placeholder="Describe your product..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <ModernButton
                  type="button"
                  variant="secondary"
                  size="md"
                  className="flex-1"
                  onClick={() => setIsAddProductOpen(false)}
                >
                  Cancel
                </ModernButton>
                <ModernButton type="submit" variant="primary" size="md" className="flex-1">
                  List Product
                </ModernButton>
              </div>
            </form>
          </Modal>

          {/* Product Details Modal */}
          {selectedProduct && (
            <Modal
              isOpen={!!selectedProduct}
              onClose={() => setSelectedProduct(null)}
              title="Product Details"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <span className="text-8xl">{selectedProduct.image}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-(--color-text) mb-2">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-(--color-text-secondary)">{selectedProduct.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-(--color-border)">
                  <div>
                    <p className="text-sm text-(--color-text-secondary) mb-1">Category</p>
                    <p className="font-medium text-(--color-text)">{selectedProduct.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-(--color-text-secondary) mb-1">Location</p>
                    <p className="font-medium text-(--color-text)">📍 {selectedProduct.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-(--color-text-secondary) mb-1">Seller</p>
                    <p className="font-medium text-(--color-text)">{selectedProduct.seller}</p>
                  </div>
                  <div>
                    <p className="text-sm text-(--color-text-secondary) mb-1">Rating</p>
                    <p className="font-medium text-(--color-text) flex items-center gap-1">
                      <Star className="w-4 h-4 text-(--color-warning) fill-current" />
                      {selectedProduct.sellerRating}
                    </p>
                  </div>
                </div>
                <div className="bg-(--color-surface-secondary) p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm text-(--color-text-secondary) mb-1">Price</p>
                      <p className="text-3xl font-bold text-(--color-primary)">
                        {formatCurrency(selectedProduct.price)}
                      </p>
                      <p className="text-sm text-(--color-text-secondary)">per {selectedProduct.unit}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-(--color-text-secondary) mb-1">Available</p>
                      <p className="text-2xl font-bold text-(--color-success)">
                        {selectedProduct.stock}
                      </p>
                      <p className="text-sm text-(--color-text-secondary)">{selectedProduct.unit}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <ModernButton
                    variant="secondary"
                    size="md"
                    className="flex-1"
                    onClick={() => setSelectedProduct(null)}
                  >
                    Close
                  </ModernButton>
                  <ModernButton
                    variant="primary"
                    size="md"
                    className="flex-1"
                    onClick={() => {
                      addToCart(selectedProduct.id);
                      setSelectedProduct(null);
                    }}
                  >
                    <div className="flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      <span>Add to Cart</span>
                    </div>
                  </ModernButton>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
