'use client';

import React, { useState } from 'react';
import {
    Button,
    Input,
    Badge,
    Spinner,
    Skeleton,
    Card,
    Modal,
    Toast,
    SearchBar,
} from '../components';
import {
    colors,
    typography,
    spacing,
    borderRadius,
    shadows,
} from '../tokens';

/**
 * Interactive StyleGuide component for visual documentation
 */
export function StyleGuide() {
    const [toastVisible, setToastVisible] = useState(false);
    const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
    const [modalOpen, setModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [inputValue, setInputValue] = useState('');

    const showToast = (type: typeof toastType) => {
        setToastType(type);
        setToastVisible(true);
    };

    return (
        <div className="max-w-6xl mx-auto p-8 space-y-16">
            {/* Header */}
            <header className="text-center space-y-4">
                <h1
                    className="text-4xl font-bold"
                    style={{ fontFamily: typography.fonts.display }}
                >
                    Corner House Design System
                </h1>
                <p className="text-lg text-[var(--color-text-secondary)]">
                    A comprehensive design system for building consistent, accessible interfaces
                </p>
                <p className="text-sm text-[var(--color-text-tertiary)]">
                    v2.0.0 — Fixed: SSR-safe tokens, React.useId, Focus Trap, Escape Key, CSS fallbacks
                </p>
            </header>

            {/* Colors Section */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold border-b pb-2">Colors</h2>
                {Object.entries(colors).map(([name, palette]) => (
                    <div key={name} className="space-y-2">
                        <h3 className="text-lg font-semibold capitalize">{name}</h3>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(palette).map(([shade, hex]) => (
                                <div key={shade} className="text-center group">
                                    <div
                                        className="w-16 h-16 rounded-lg shadow-sm border cursor-pointer transition-transform hover:scale-110"
                                        style={{ backgroundColor: hex }}
                                        title={`${name}-${shade}: ${hex}`}
                                    />
                                    <p className="text-xs mt-1 font-mono">{shade}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            {/* Typography Section */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold border-b pb-2">Typography</h2>
                <div className="space-y-4">
                    {Object.entries(typography.scale).map(([name, style]) => (
                        <div key={name} className="flex items-baseline gap-4 flex-wrap">
                            <span className="w-24 text-sm text-[var(--color-text-tertiary)] font-mono shrink-0">
                                {name}
                            </span>
                            <span
                                style={{
                                    fontSize: style.size,
                                    lineHeight: style.lineHeight,
                                    fontWeight: style.weight,
                                    fontFamily: style.font === 'display' ? typography.fonts.display : typography.fonts.body,
                                    letterSpacing: 'letterSpacing' in style ? style.letterSpacing : undefined,
                                    textTransform: 'textTransform' in style ? style.textTransform : undefined,
                                }}
                            >
                                The quick brown fox jumps
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Buttons Section */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold border-b pb-2">Buttons</h2>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Variants</h3>
                    <div className="flex flex-wrap gap-4 items-center">
                        <Button variant="primary">Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="destructive">Destructive</Button>
                        <Button variant="link">Link</Button>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Sizes</h3>
                    <div className="flex flex-wrap gap-4 items-center">
                        <Button size="sm">Small</Button>
                        <Button size="md">Medium</Button>
                        <Button size="lg">Large</Button>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium">States</h3>
                    <div className="flex flex-wrap gap-4 items-center">
                        <Button disabled>Disabled</Button>
                        <Button isLoading>Loading</Button>
                        <Button isLoading loadingText="Saving...">With Text</Button>
                        <Button leftIcon={<span>→</span>}>With Icon</Button>
                        <Button fullWidth className="max-w-xs">Full Width</Button>
                    </div>
                </div>
            </section>

            {/* Form Elements Section */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold border-b pb-2">Form Elements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Default Input"
                        placeholder="Enter text..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Input
                        label="With Error"
                        error="This field is required"
                        defaultValue="Invalid value"
                    />
                    <Input
                        label="With Hint"
                        hint="This is helpful information"
                        placeholder="With helpful context"
                    />
                    <Input
                        label="Disabled"
                        disabled
                        defaultValue="Cannot edit"
                    />
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1.5">Search Bar</label>
                        <SearchBar
                            value={searchValue}
                            onChange={setSearchValue}
                            onClear={() => setSearchValue('')}
                            placeholder="Search for items..."
                        />
                    </div>
                </div>
            </section>

            {/* Cards Section */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold border-b pb-2">Cards</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card variant="light" padding="md" hover>
                        <h3 className="font-semibold">Light Card</h3>
                        <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                            Standard light theme card with hover effect
                        </p>
                    </Card>

                    <Card variant="glass" padding="md" hover>
                        <h3 className="font-semibold">Glass Card</h3>
                        <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                            Glassmorphism effect with backdrop blur
                        </p>
                    </Card>

                    <div className="bg-[var(--color-forest-900)] p-4 rounded-3xl">
                        <Card variant="dark" padding="md">
                            <h3 className="font-semibold text-white">Dark Card</h3>
                            <p className="text-sm text-white/70 mt-2">
                                For dark backgrounds
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Badges Section */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold border-b pb-2">Badges</h2>
                <div className="flex flex-wrap gap-3">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                    <Badge variant="info">Info</Badge>
                    <Badge variant="outline">Outline</Badge>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Badge size="sm" variant="primary">Small</Badge>
                    <Badge size="md" variant="primary">Medium</Badge>
                </div>
            </section>

            {/* Loading States Section */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold border-b pb-2">Loading States</h2>
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                        <Spinner size="sm" />
                        <span>Small</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Spinner size="md" />
                        <span>Medium</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Spinner size="lg" />
                        <span>Large</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Skeletons</h3>
                    <div className="space-y-2 max-w-md">
                        <Skeleton lines={3} variant="text" />
                    </div>
                    <div className="flex gap-4">
                        <Skeleton width={64} height={64} variant="circular" />
                        <Skeleton width={200} height={100} variant="rectangular" />
                    </div>
                </div>
            </section>

            {/* Interactive Components Section */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold border-b pb-2">Interactive Components</h2>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Toast Notifications</h3>
                    <div className="flex flex-wrap gap-3">
                        <Button variant="outline" onClick={() => showToast('success')}>
                            Success Toast
                        </Button>
                        <Button variant="outline" onClick={() => showToast('error')}>
                            Error Toast
                        </Button>
                        <Button variant="outline" onClick={() => showToast('warning')}>
                            Warning Toast
                        </Button>
                        <Button variant="outline" onClick={() => showToast('info')}>
                            Info Toast
                        </Button>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Modal / Dialog</h3>
                    <Button onClick={() => setModalOpen(true)}>
                        Open Modal
                    </Button>
                    <p className="text-sm text-[var(--color-text-tertiary)]">
                        ✓ Focus trapped inside modal<br />
                        ✓ Escape key closes modal<br />
                        ✓ Body scroll locked<br />
                        ✓ Click backdrop to close
                    </p>
                </div>
            </section>

            {/* Spacing Reference */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold border-b pb-2">Spacing Scale</h2>
                <div className="flex flex-wrap gap-2">
                    {Object.entries(spacing).slice(0, 15).map(([key, value]) => (
                        <div key={key} className="text-center">
                            <div
                                className="bg-[var(--color-primary)] rounded"
                                style={{ width: value, height: value, minWidth: '8px', minHeight: '8px' }}
                            />
                            <p className="text-xs mt-1 font-mono">{key}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Toast */}
            <Toast
                message={`This is a ${toastType} notification!`}
                type={toastType}
                isVisible={toastVisible}
                onClose={() => setToastVisible(false)}
                action={{
                    label: 'Undo',
                    onClick: () => setToastVisible(false),
                }}
            />

            {/* Modal */}
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Example Modal"
                description="This modal demonstrates proper accessibility features."
                size="md"
            >
                <div className="space-y-4">
                    <p className="text-[var(--color-text-secondary)]">
                        This modal has:
                    </p>
                    <ul className="list-disc list-inside text-sm text-[var(--color-text-secondary)] space-y-1">
                        <li>Focus trapped inside (try tabbing)</li>
                        <li>Escape key to close</li>
                        <li>Click outside to close</li>
                        <li>Body scroll locked</li>
                        <li>Focus restored on close</li>
                    </ul>

                    <Input
                        label="Example Input"
                        placeholder="Tab to this field..."
                    />

                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="ghost" onClick={() => setModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={() => setModalOpen(false)}>
                            Confirm
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default StyleGuide;
