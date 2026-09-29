'use client'

import * as am5 from '@amcharts/amcharts5'
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow'
import * as am5map from '@amcharts/amcharts5/map'
import { useEffect, useRef } from 'react'

interface GlobeCanvasProps {
  onReady?: () => void
}

export function GlobeCanvas({ onReady }: GlobeCanvasProps) {
  const chartDivRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const chartDiv = chartDivRef.current
    if (!chartDiv) return

    const root = am5.Root.new(chartDiv)
    root.interfaceColors.set('background', am5.color(0x0a0a0a))

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'none',
        panY: 'none',
        projection: am5map.geoOrthographic(),
        paddingBottom: 0,
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 0,
        wheelable: false,
      })
    )

    chart.set('rotationX', -20)

    const backgroundSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {})
    )
    backgroundSeries.mapPolygons.template.setAll({
      fill: am5.color(0x0a0a0a),
      fillOpacity: 1,
      strokeOpacity: 0,
    })
    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180),
    })

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
      })
    )
    polygonSeries.mapPolygons.template.setAll({
      fill: am5.color(0x1a1a1a),
      stroke: am5.color(0x2a2a2a),
      strokeWidth: 0.5,
      interactive: false,
    })

    const graticuleSeries = chart.series.unshift(
      am5map.GraticuleSeries.new(root, { step: 10 })
    )
    graticuleSeries.mapLines.template.setAll({
      stroke: am5.color(0xffffff),
      strokeOpacity: 0.04,
    })

    let rafId: number | undefined
    let readyTimeoutId: number | undefined
    let animationTimeoutId: number | undefined
    let isMounted = true
    let isReady = false
    let isVisible = false
    let rotation = -20

    function stopAnimation() {
      if (rafId === undefined) return
      cancelAnimationFrame(rafId)
      rafId = undefined
    }

    function startAnimation() {
      if (
        !isMounted ||
        !isReady ||
        !isVisible ||
        document.hidden ||
        rafId !== undefined
      ) {
        return
      }
      rafId = requestAnimationFrame(animate)
    }

    function animate() {
      rafId = undefined
      if (!isMounted || !isReady || !isVisible || document.hidden) return

      rotation = (rotation - 0.06) % 360
      chart.set('rotationX', rotation)
      rafId = requestAnimationFrame(animate)
    }

    const intersectionObserver = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (!entry) return

      isVisible = entry.isIntersecting
      if (isVisible) {
        startAnimation()
      } else {
        stopAnimation()
      }
    })
    intersectionObserver.observe(chartDiv)

    function handleVisibilityChange() {
      if (document.hidden) {
        stopAnimation()
      } else {
        startAnimation()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    polygonSeries.events.once('datavalidated', () => {
      if (!isMounted) return
      readyTimeoutId = window.setTimeout(() => {
        if (!isMounted) return
        onReady?.()

        animationTimeoutId = window.setTimeout(() => {
          if (!isMounted) return
          isReady = true
          startAnimation()
        }, 300)
      }, 50)
    })

    return () => {
      isMounted = false
      stopAnimation()
      if (readyTimeoutId !== undefined) window.clearTimeout(readyTimeoutId)
      if (animationTimeoutId !== undefined) {
        window.clearTimeout(animationTimeoutId)
      }
      intersectionObserver.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      root.dispose()
    }
  }, [onReady])

  return <div ref={chartDivRef} className="size-full" />
}
